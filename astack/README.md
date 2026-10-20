# astack

Your personal engineering system for shipping high-quality code across any tech stack.

**Philosophy:** Quality over speed. Principles over recipes. Verification over assumptions.

## Install

As a plugin (Claude Code or Cursor), point your client at this directory —
`plugin.json` and `.cursor-plugin/plugin.json` declare the bundle. Or install
the skills directly:

```bash
npx skills@latest add baalej/skills/astack --agent claude-code --yes
```

## Quick start

```
/astack-mode plan this feature end-to-end
```

That's it. `/astack-mode` will:
- Match your task to a playbook
- Open a todo list with steps
- Guide you through each step using principles
- Route to skills as needed

## What's in here

### 16 Principles

Core values that guide all work. Each is a skill of its own, in `skills/`:
1. Quality Over Speed
2. Code is Documentation
3. Plans Evolve; Principles Don't
4. Root Causes, Not Symptoms
5. Build the Lever
6. Encode Lessons in Structure
7. Laziness Protocol
8. Foundational Thinking
9. Exhaust the Design Space
10. Sequence Verifiable Units
11. Details Compound
12. Test Behavior, Not Implementation
13. Explain the Number
14. Model the Domain
15. Minimize Reader Load
16. Attack the Premise

### Depth skills

Methods and recipe layers, either routed into by a playbook step or invoked
directly by name. This is where stack specificity belongs. A depth skill names its scope on its first line and is as
specific as the job needs.

- **`web-motion`** — Building and reviewing web motion: tool ladder, compositor property tiers, exact curves and durations, gestures, interruption, reduced motion, the review bar
- **`verify-by-eye`** — The proof method for interfaces: observation performed systematically, from using it as a user through to the fresh-eyes pass
- **`mobile-web`** — The platform behaviors under a web app on a phone: viewport units, safe areas, tap highlight, `touch-action`, sticky hover, input zoom, overscroll, status bar. Symptom table first
- **`break-the-ui`** — Stress a component with the plausible worst value for every field it renders, behind a dev-only toggle, then report defects separately from design decisions
- **`animation-vocabulary`** — Reverse lookup from a described sensation to the precise term. Names effects; recommends nothing
- **`blast-radius`** — What a change breaks past the diff: where grep stops, the one fact it's safe because of, and a five-rung evidence ladder you report your position on
- **`log-friction`** — Review the session and append what chafed about astack to `FRICTION.md`. The one skill pointed at astack itself

Entries inside a depth skill are labeled **fact** (platform or perceptual
behavior you can verify by observing it), **default** (a sound starting value,
adjust for the product), or **taste** (one house style among several). The
labels exist so a depth skill reads as reference rather than as a rulebook —
experimental work is free to depart from any default with a reason, and the
label tells you which things are departures and which are just wrong.

### 10 task playbooks

Step-by-step workflows for different types of work. Each playbook references principles to guide execution.

Located in `skills/astack-mode/playbooks/` — they ship with the `astack-mode` skill, so installing it brings them along:
1. **Plan/Scope** — Plan a project in detail
2. **Design/Architecture** — Design feature architecture
3. **Build** — Build a feature from a design
4. **Fix** — Fix a bug at root
5. **Refactor** — Improve code structure
6. **Review** — Review your own code
7. **Learn** — Understand existing code
8. **Perf** — Optimize performance
9. **Craft** — Make an interface feel right (build, debug, or audit)
10. **Prototype** — Settle a design or empirical question with throwaway variants

Plus two reserved playbooks that are never matched from a request directly:

- **Figure It Out** — the fallback. When nothing above fits, or a narrower
  playbook would cover only part of the task, this designs a bespoke one: frame
  a falsifiable predicate, build the sequence riskiest-unknown-first, run each
  unit as an experiment, keep a trail. Costs a design pass, so prefer a narrower
  playbook whenever one genuinely fits.
- **Handoff** — the terminal step every playbook runs last. It owns the decision
  log, the evidence labels, and the reply, so the nine never duplicate that
  structure.

### astack-mode

The main entry point. A sticky mode that reads your task, matches it to a playbook, and orchestrates execution.

Located in `skills/astack-mode/SKILL.md`.

## How it works

### The workflow

1. **Type** `/astack-mode [task]`
2. **astack-mode reads** your task and matches it to a playbook
3. **A todo list opens** with the playbook's 6 steps
4. **You follow each step**, using principles to guide decisions
5. **Verify at each step** — proofs are required
6. **Handoff when done** — document decisions, assumptions, tradeoffs

### Example

```
/astack-mode this function is slow; optimize it
```

Matches to: **Performance Optimization playbook**

Steps:
1. Measure baseline
2. Profile to find bottleneck
3. Identify root cause
4. Design optimization
5. Implement and measure
6. Handoff (document improvement)

### Sticky mode

Once you invoke `/astack-mode`, it stays active across turns. New messages are checked against playbooks:
- If they match a playbook → apply it
- If they're continuing the current playbook → execute the next step
- If they're off-topic → step out

Say "stop" or "exit" to leave sticky mode.

## The quality bar

All code, always:
- **Performant** — Measured, justified, no unnecessary overhead
- **Secure** — No vulnerabilities, validated at boundaries
- **Correct** — Proofs exist (tests, runs, observations)
- **Maintainable** — Clear names, obvious structure, readable
- **Felt** — For anything a person looks at or touches: it responds, motion has a purpose, nothing jars

These are non-negotiable. Don't ship code that fails these gates.

## Two layers: principles and stack

astack has a top layer and a bottom layer, and the split is the whole design.

**Principles are written to hold anywhere.** Not because portability is a goal
in itself — because a statement that only holds in one language is usually a
recipe wearing a principle's clothes. "Fix root causes" survives translation
into Python, PHP, Go, and TypeScript, which is evidence it says something real.
"Use TypeScript for type safety" does not survive it, so it belongs one layer
down. The agnosticism is a side effect of writing principles that are actually
principles. It is not a rule you follow, and nothing in astack asks you to keep
your own work portable.

**Stack specificity lives in the depth skills**, and it should be as concrete as
the work demands — exact curves, exact syntax, exact tooling. A depth skill
names its scope on its first line and doesn't apologize for being narrow.
`web-motion` is web-only and says so.

Example of the split: **"Prove it works"** translates to:
- Compiled language → compiler catches type errors
- Interpreted language → tests and linting
- UI → observation, performed systematically (`verify-by-eye`)
- Backend → integration tests

The method changes; the requirement doesn't.

The same split carries craft. *"Motion should start immediately and settle
gently"* is a fact about where a user's attention goes, so it holds on web, iOS,
and desktop alike — only the binding differs. The principle
(`details-compound`) ships the decision and the budget; the depth skill
(`web-motion`) ships the exact curves. To cover another platform, add a sibling
depth skill beside it rather than widening the principle.

## Solo, with handoff

astack is built for solo work with collaboration support:
- **Solo:** You're the single decision maker
- **Handoff:** Every playbook ends by running the shared Handoff playbook, which documents decisions, assumptions, tradeoffs and cuts so others can pick it up
- **Collaboration:** Comment on decisions, add context, hand off mid-stream

## What astack does not ship

astack is deliberately small: 16 principles, 7 depth skills, and the
`astack-mode` orchestrator. It carries no prose-cleanup, PR-driving, or
subagent-fleet skills. Install those alongside it if you want them; nothing in
astack depends on them.

## Maintaining astack

The bundle checks itself:

```bash
node astack/scripts/check-bundle.mjs
```

It verifies frontmatter and name/directory agreement, that every description
opens with its trigger, that each principle carries a `## Related` section, that
no relative link is dead, that `astack-mode`'s tables match what is on disk,
that every playbook declares a `**Reply:**` contract and routes to Handoff, that
no playbook lists the same principle twice, and that every count claimed in a
README or manifest is true.

Each rule is there because the convention was broken by hand at least once. Run
it after editing anything in `skills/`.

## Philosophy

**Quality over speed.** Throughput without quality is not a goal. Fewer, higher-quality pieces ship better than more slop.

**Principles over recipes.** Adapt the approach to your tech, not the other way around.

**Verification over assumptions.** Prove it works on the real artifact. Don't accept "it compiles" or "no errors."

**Plans evolve; principles don't.** Expect to change direction. The quality standards stay fixed.

**Specific where it counts.** Principles stay general because that is what makes them principles. Depth skills get as concrete as the stack requires.

## Getting started

1. Learn the [16 principles](skills/) — skim them; you'll reference them during work
2. Understand the [10 task playbooks](skills/astack-mode/playbooks/) — these are your workflows
3. Start with `/astack-mode` and your task

That's it. The system guides you from there.

## Why this approach

Most engineering advice is either vague ("write good code") or too specific ("use TypeScript"). astack bridges that gap:

- **Principles** are general enough to survive translation into any stack
- **Depth skills** are as specific as the stack requires
- **Playbooks** are concrete workflows that route between the two
- **astack-mode** is the orchestrator that brings them together

You get guidance without dogma. Flexibility without chaos.

## Credits

Several of astack's conventions were worked out by studying
[pstack](https://github.com/cursor/plugins/tree/main/pstack) by Lauren Tan
(MIT): trigger-first skill descriptions, cross-linked sibling principles, a
shared terminal playbook with per-playbook reply contracts, explicit evidence
labels, and a committed validator for the bundle's own conventions.
`test-behavior-not-implementation`, `explain-the-number`, `model-the-domain`,
`minimize-reader-load`, `attack-the-premise`, `blast-radius` and the Figure It
Out fallback cover engineering ideas that pstack states well; the text here is
astack's own.

The motion and interface craft owes a direct debt to
[Emil Kowalski](https://emilkowal.ski)'s
[skills for designers and engineers](https://github.com/emilkowalski/skills)
(MIT) and to animations.dev: `web-motion`, `mobile-web`, `break-the-ui` and
`animation-vocabulary` cover ground his skills map out, and a handful of lines
in `web-motion` are his wording. His versions are stricter by design — a review
bar where approval is earned. astack keeps the substance and softens the
verdicts, because exact curves and durations are defaults here, not findings.

The Prototype playbook draws on both: pstack's throwaway-sketch discipline and
the divergence rule and switcher contract from Emil's prototype skill.

---

Ship high-quality code. Start with `/astack-mode` and your task.
