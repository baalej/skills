# Friction log

Rough edges found while actually using astack. Notes, not decisions.

**Why this file exists.** Every rule in `scripts/check-bundle.mjs` is there
because something went wrong by hand — a duplicated principle bullet, counts
that drifted in five places, a mistyped word that landed as a CJK glyph. Rules
invented by *imagining* mistakes would have been worse. The skills deserve the
same treatment, and that needs a record of what actually chafed rather than what
seemed likely to.

## How entries get here

Run this after a real task, usually at the end of a session:

```
/log-friction
```

It reviews the session it is in, separates friction with **astack** from
friction with **the task**, and appends a dated block below. It records
complaints and changes nothing. If the run went fine it writes nothing and says
so — an invented finding is worse than an empty log.

Add your own entries in your own words whenever you prefer. Format is loose:
date, what you were doing, what chafed. `/log-friction` cannot see a skill it
misread, or a better approach a playbook quietly discouraged, so when something
felt off and no entry captures it, that one is yours to write.

## The gate, for later

When this log is triaged, the test for acting on an entry is:

> **Would the change alter a future decision?** One rough session is an
> anecdote, not a rule.

An entry that appears once and bothered you mildly is data. The same entry three
times, from different tasks, is a defect. Resist editing a skill off a single
complaint — that is how a 24-skill bundle becomes a 40-skill bundle nobody
reads.

Entries that lead nowhere stay here. A rejected complaint is still evidence
about which parts of astack are confusing.

Verifying a fix depends on what changed. A vague or missing step: re-run the
task that produced the complaint. A **description or routing** change: that
needs repeated trials, because matching is stochastic and one run proves
nothing — Claude Code's `skill-creator` runs evals with variance analysis.
Either way, finish with `node scripts/check-bundle.mjs`.

---

## Entries

*Nothing yet — astack has not been used on a real task. Everything in it was
written from the inside, so this file is empty in the one way that matters.*
