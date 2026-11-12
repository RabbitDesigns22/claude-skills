---
name: full-power
description: >-
  Load when the result must be the best the agent can produce and a mistake is expensive: a client deliverable, a production change, a decision others will act on, a hard bug, or when the user says "full power", "best possible", "no errors", "be perfect", "max effort", "potencia máxima", "lo mejor de lo mejor", "sin errores", "que sea perfecto". It does not make the model smarter; it spends the model's capacity where it changes the outcome: it sorts the task into steps by risk, sends only the hard step to the strongest model at high effort, runs independent attempts plus a judge when one answer is not enough, has a fresh-context verifier attack the result before "done", checks what the model cannot know or compute and uses tools instead of guessing, and writes every failure into a log the next run reads. Routine steps stay cheap. Not for quick questions or one-line edits.
license: MIT
---

# Full power

Most bad results from a strong model are not a lack of intelligence. They come from the same few places: the hard step got the same quick pass as the easy ones, one first draft was shipped as the answer, the agent graded its own work, it guessed a fact it could have looked up, and the same mistake happened again next week. Each has a fix that costs tokens only where it matters.

One rule: **spend effort in proportion to what a mistake costs, and never let the author be the only judge.**

## 1. Sort the task by risk (1 minute, before any work)

Write the steps, then mark each one:

| Mark | Meaning | Examples |
|---|---|---|
| R (routine) | wrong is cheap and obvious | reading files, listing, formatting, renaming |
| H (hard) | needs judgment; wrong is plausible-looking | the plan, the root cause, the design, the copy a customer reads |
| X (irreversible) | acts on the world | sending, paying, deploying, publishing, deleting |

Write the acceptance list for the whole task: 3-7 checks a stranger could verify ("the price matches the price list", "tests pass", "the page shows X live").

## 2. Right model and effort per step

- **R steps:** the current model at low/medium effort, or a small-model subagent for bulk reading that returns only what matters.
- **H steps:** the strongest available model at high effort, in a subagent with a short brief that carries only what that step needs (goal, constraints, the acceptance checks, what was already ruled out). In Claude Code: the Agent tool with a model and effort for that call; one-turn deep thinking with `ultrathink` when the user asks for it.
- **X steps:** never on the first draft; they wait for step 4.
- After two failed attempts at the same thing on a cheaper model, move that step up. Never a third identical try.

## 3. More than one attempt when one is not enough

For an H step whose output is a choice among many plausible answers (a headline, an architecture, a diagnosis, a design direction):

1. Run 2-3 **independent** attempts: separate subagents, same brief, none sees the others. Vary one thing on purpose (approach or angle), not the wording.
2. A **judge** (a fresh subagent, strongest model) scores each attempt against the acceptance list, quoting the evidence, and picks one or merges the best parts. The judge did not write any attempt.
3. Keep the losing attempts' good points as notes; drop the rest.

Skip this for steps with one checkable right answer. There, verification beats voting.

## 4. Fresh-eyes verifier before "done"

A subagent that has not seen your reasoning gets: the original request, the result, and the acceptance list. Its brief:

> Assume this result is wrong. Find the most likely way it fails the request: a check it does not meet, a fact not traceable to a source, an edge case, a requirement read too narrowly, something changed that should not have been. Quote the evidence. If you find nothing, say what you checked.

- Fix what it finds, then rerun the check that failed.
- For X steps the verifier sees the exact action (what, where, what must not change) and the action runs only if it passes.
- Before a big irreversible plan, run the same verifier as a **pre-mortem**: "it is a week later and this failed; why?"

## 5. Know the ceiling: tools instead of guesses

Before answering, list what the model cannot reliably do from memory and route it:

| Do not guess | Do instead |
|---|---|
| today's date, prices, versions, who did what last week | read the live source; say the time you read it |
| arithmetic beyond a few numbers, counts, dates math | run code |
| what a file, page or system says | open it; quote the line |
| whether code works | run it, run the tests |
| what an image or video shows in detail | look at the exported file, zoom |
| anything outside your access | say it is not checked and why |

"Verified" only for what was checked in this run. Everything else is written as not verified.

## 6. Learn: the log the next run reads

- Every miss caught by the verifier, the user or reality goes into one shared error log: date, what went wrong, the rule that would have prevented it.
- The first step of the next task in that area is reading the relevant part of the log.
- A rule that fires three times becomes a checklist line or a hook, not a note.

## 7. Report

One block: what was done, the acceptance list with pass/fail and evidence, where the strong model or extra attempts were used and why, what the verifier found and what changed, and what is not verified.

## Limits

- It costs more on H and X steps by design: roughly the strong model for one or two steps plus a verifier. On routine tasks it should cost about the same as working without it; if it does not, the task was mis-sorted.
- Independent attempts and judges share the model's blind spots. Real-world checks (running it, opening the live page, the user's own sources) outrank any agreement between agents.
- Skills cannot change the model's raw ability or context limit. This one makes sure none of it is wasted.
