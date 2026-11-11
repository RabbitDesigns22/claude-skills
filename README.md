# Claude skills for running a business with AI agents

**20 agent skills from a small agency that runs 20+ Claude Code sessions in parallel, every day, for real clients.**

Each skill fixes a problem that kept happening in that setup: the agent said "done" without checking, sent a wrong price to a client, paused more than it was asked to, got stuck mid-task overnight, burned the plan on the expensive model, or redid the same work three times. Each one comes from real repeated failures in that setup, and each skill's own repo shows what changes with it and without it.

Mostly plain instructions (`SKILL.md`). Three include short Python scripts you can read first: `hora-exacta` (reads the computer clock and asks one public IP-location service, ipwho.is, for the city and time zone, cached for 6 hours), `skill-harvest` and `session-watchdog` (local files only, no network). They work in Claude Code and in any agent that reads `SKILL.md` skills.

## Install

All of them, with the [skills CLI](https://skills.sh) (it asks which ones you want):

```bash
npx skills add RabbitDesigns22/claude-skills
```

As a Claude Code plugin:

```
/plugin marketplace add RabbitDesigns22/claude-skills
/plugin install rabbit-skills@rabbit-skills
```

Or copy any folder from `skills/` into `~/.claude/skills/`.

## Get it right the first time

| Skill | What it fixes |
|---|---|
| [one-pass](skills/one-pass) | stops paying tokens for rework: acceptance list first, read once, no blind retries |
| [never-twice](skills/never-twice) | a shared error log so no session repeats a known mistake |
| [one-answer](skills/one-answer) | one thought-through answer instead of plan, fix, new plan |
| [study-first](skills/study-first) | reads everything in full and answers point by point, no invented details |
| [source-every-fact](skills/source-every-fact) | every price, phone and name on a post traced to its source, nothing added |
| [published-vs-planned](skills/published-vs-planned) | says "published" only for what it saw live, Facebook and Instagram checked apart |
| [only-what-was-asked](skills/only-what-was-asked) | "pause only Google Ads" pauses only Google Ads, and proves the rest did not move |

## Run many sessions without chaos

| Skill | What it fixes |
|---|---|
| [model-per-chat](skills/model-per-chat) | the right model for each chat: cheap base, climbs to the top model only for the hard or irreversible step |
| [session-watchdog](skills/session-watchdog) | wakes the sessions that got stuck mid-task, leaves the rest alone |
| [in-the-loop](skills/in-the-loop) | a live board so parallel sessions know what the others changed |
| [skill-harvest](skills/skill-harvest) | reads all your sessions and finds the skills you are missing or forgot to load |
| [hora-exacta](skills/hora-exacta) | real date and time in every message, so nothing lands on the wrong day |

## Work with the owner, not around them

| Skill | What it fixes |
|---|---|
| [hands-on](skills/hands-on) | the agent does what it can and only asks you for codes, keys and payments |
| [report-now](skills/report-now) | a status report checked live right now, never an old one |
| [sort-me-out](skills/sort-me-out) | one ordered list of what is urgent, waiting and forgotten |
| [easy-for-them](skills/easy-for-them) | steps people actually follow: direct link, one action per line |

## Sell and advertise

| Skill | What it fixes |
|---|---|
| [whatsapp-closer](skills/whatsapp-closer) | evidence-ranked rules for a WhatsApp sales assistant that closes |
| [whatsapp-number-onboarding](skills/whatsapp-number-onboarding) | connect a number to the WhatsApp Cloud API in the safe order |
| [small-budget-ads](skills/small-budget-ads) | Meta Ads rules for 1-5 USD a day ad sets |
| [proposal-pdf](skills/proposal-pdf) | short PDF proposals with every price checked against its source |

Each skill also has its own repo with a longer README, a with/without example and its test score: `github.com/RabbitDesigns22/<skill-name>`.

## Español

20 skills para agentes de IA, sacadas de una agencia chica que trabaja todos los días con más de 20 sesiones de Claude Code en paralelo y clientes reales. Cada una arregla un problema que se repetía: decir "listo" sin comprobar, mandar un precio mal, apagar más de lo pedido, quedarse pegado de noche, gastar el plan en el modelo caro. Cada repo muestra qué cambia con la skill y sin ella.

Instalar todas: `npx skills add RabbitDesigns22/claude-skills`

If one of them saved you a redo, a star here helps other people find them.

## License

MIT. Made by [Rabbit Designs](https://github.com/RabbitDesigns22).
