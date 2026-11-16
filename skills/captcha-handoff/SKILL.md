---
name: captcha-handoff
description: Load whenever an agent driving a browser that the user can also see (the Claude desktop browser pane, a shared Chrome, any browser the human watches) hits a step only the human may do, such as an "I'm not a robot" CAPTCHA, a sign-in, a 2FA prompt or an identity check, and whenever the user is using that same browser ("I opened GitHub for you", "I already clicked it", "look at what I'm doing"). The agent asks once, watches the page with a cheap helper agent, and carries on by itself the moment the human finishes, so nobody has to type "done". It also keeps track of what the human does in the window for a few tokens, and never navigates over the tab the human is using. It never solves or bypasses a CAPTCHA. Triggers on "captcha", "I'm not a robot", "verify you are human", "sign in", "I clicked it", "done, continue", "I opened it in your window".
---

# Captcha handoff: the human clicks, the agent continues by itself

The usual loop wastes the human's time. The agent hits a CAPTCHA and says "please solve it and tell me when you're done". The human solves it, types "done", and the agent resumes. Sometimes the agent also opened its test page on top of the tab the human had just set up for it.

This skill removes the "done" message and protects the human's tab.

## Rule 1: the human's tab is theirs
- Before you navigate, list the tabs (`tabs_context` in the Claude browser pane). It is cheap: only tab ids, URLs and which one is in front.
- A tab the human opened or changed tells you what they want. Work in it if the task is there. Put your own tests and side work in a **new tab**, and never navigate over theirs.
- Browser tools often add a note like *"the user clicked or pressed keys in this page"*. Read the page state before acting (`get_page_text` or `find`, not a screenshot).

## Rule 2: one human step, then the agent continues alone
You never solve a CAPTCHA, type a password or enter a one-time code. You only watch for the moment the human is done.

1. **Ask once.** Send a push notification if you have one, so it reaches them away from the chat, and bring that tab to the front. Example: "The site wants 'I'm not a robot' in my browser. Click it and I'll continue by myself, no need to reply."
2. **Hand the waiting to a cheap helper, not to yourself.** Every check you run in the main conversation re-reads the whole conversation, so it costs about as much as the human typing "done". Start a small subagent (for example `Agent` with model `haiku`) with this brief:
   > Your only job: wait until a CAPTCHA in browser tab `<tabId>` is cleared, then report. Never click or type in the page. Read `scripts/wait.js` once and run its full text with the browser JavaScript tool on tab `<tabId>`. If it returns `"done": true`, or the tool says the page navigated, reply only `DONE <by> <url>`. If `"by": "no captcha found"`, reply only `NO CAPTCHA <url>`. If `"done": false`, run it again, up to 15 times, then reply only `NO CHANGE`.

   Then end your turn with nothing more to the human. While the helper waits, the main conversation spends nothing.
3. **What `scripts/wait.js` does.** It only reads the page and waits up to 40 seconds per run (the Claude browser JavaScript tool times out at 45). It returns at once with `by: "no captcha found"` if the page shows none. It ignores the always-visible reCAPTCHA v3 badge. It recognizes reCAPTCHA, hCaptcha, Cloudflare Turnstile and challenge pages, Arkose/FunCaptcha and PerimeterX "press and hold". It reports done on any of three signals:
   - a response token got filled;
   - the CAPTCHA disappeared;
   - the page URL changed.
4. **When the helper reports `DONE`, you are woken.** That one wake-up costs about what a "done" message would, and it cannot be avoided, because you have to resume. Read the page and continue the task. Never ask "are you done?". On `NO CAPTCHA`, the script found no known CAPTCHA on the page: look at the page yourself before asking anything. On `NO CHANGE` (about 10 minutes without a click), write one line, for example "Still waiting for the CAPTCHA on <site>; send me anything once it's done", and do not ask again.
5. **No subagents available?** Run `wait.js` yourself, one run at a time, at most 15 runs. Each run costs about as much as one "done".

## Rule 3: know what the human is doing, cheaply
- **Always, almost free:** the tab list and the "user clicked" notes tell you which tabs they opened, where they are and whether they touched the page.
- **More detail, only when needed:** tell the human in one line that you are turning on a click watcher, then run `scripts/watch.js` once in the tab where they will work. It records their real clicks, which field they edited and page exits, never what they type (for form fields it reads only the label, placeholder, name or id), and keeps only the last 30 events. To read it, run this one line:
  `window.__watch ? window.__watch.summary().last.map(e=>e.type+' '+e.on).join(' | ') : 'no watcher'`
- The watcher is gone after the page navigates. Re-install it only if you still need it.
- Do **not** take repeated screenshots to watch the human, do not re-read the whole page every few seconds, and do not put the watcher on pages with private data the task does not need.
- Honest limit: between turns the agent sees nothing. It only looks while it is working or waiting (Rule 2).

## Rules
- CAPTCHAs, passwords, one-time codes and payments are the human's. The agent never solves, bypasses or types them.
- What the human does in the window is used for the task only. It is not saved to files or sent anywhere.
- When finished, close the tabs you opened and leave theirs.

## Tested
In the Claude desktop browser pane, on a local test page whose CAPTCHA block disappears after a delay:
- in-conversation runs detected it at 25 s and at 60 s (two runs: 40 s "nothing yet", then "captcha gone");
- a Haiku helper detected it at 70 s and replied `DONE`;
- the watcher recorded a real click as `click label "I am not a robot"`.

Not yet tested on a live third-party CAPTCHA.
