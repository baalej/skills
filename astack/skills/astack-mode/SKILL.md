---
name: astack-mode
description: "Entry point for astack. Apply on /astack-mode, or when a task needs a playbook: planning, design, build, bug fix, refactor, review, learning a codebase, performance, or interface craft. Matches the task to a playbook, then orchestrates the run against the 13 principles."
---

# astack-mode

Your personal engineering system for shipping high-quality code. Start here.

## How it works

Type `/astack-mode` with your task. This skill:

1. **Matches your task to a playbook** (Plan, Design, Build, Fix, Refactor, Review, Learn, Perf, Craft)
2. **Reads that playbook file** from `playbooks/` — the table below maps playbook to file
3. **Opens a todo list** with the playbook's steps
4. **Routes to other skills** when a step needs depth
5. **Stays active** (sticky mode) across turns
6. **Guides execution** using your 13 principles

Do not work from the summaries on this page. Once you've matched a playbook,
read its file before starting — the steps and their verification criteria live
there, not here.

**Announce the match before working.** State which playbook you matched and, if
it has modes, which one you read the request as — in one line, before step 1.
A wrong match costs one word to correct now and three steps to discover later.

## The playbooks

Paths are relative to this skill's directory.

| Playbook | Use when | File |
|---|---|---|
| **Plan/Scope** | Planning a feature end-to-end | `playbooks/playbook-plan-scope.md` |
| **Design** | Designing architecture before coding | `playbooks/playbook-design-architecture.md` |
| **Build** | Building a feature from a design | `playbooks/playbook-build-feature.md` |
| **Fix** | Fixing a bug or issue | `playbooks/playbook-fix-bug.md` |
| **Refactor** | Improving code structure | `playbooks/playbook-refactor.md` |
| **Review** | Reviewing your own code | `playbooks/playbook-code-review.md` |
| **Learn** | Understanding existing code | `playbooks/playbook-learn-understand.md` |
| **Perf** | Optimizing performance | `playbooks/playbook-performance.md` |
| **Craft** | Making an interface feel right — build, debug, or audit motion | `playbooks/playbook-craft-interface.md` |

**Fallback.** When the task matches none of the rows above, or a narrower
playbook would cover only part of it (a migration across many call sites, an
ambitious multi-part change, work the user steps away from to review later),
run **Figure It Out** (`playbooks/playbook-figure-it-out.md`). It designs a
bespoke playbook for the task before any code. Never leave a task unmatched:
that is what this row is for. Prefer a narrower playbook whenever one genuinely
fits, since this one costs a design pass first.

**Terminal playbook.** Every playbook above ends by running **Handoff**
(`playbooks/playbook-handoff.md`). It owns the decision log, the evidence
labels, and the reply, so each playbook's own final step carries only what is
unique to it. Handoff is never matched from a user request directly.

## The 13 principles

Your system is built on 13 core principles that guide all work. Each is also a
skill of its own — when a playbook step calls for depth on one, invoke it by
name (e.g. `/root-causes-not-symptoms`) to get the full treatment.

They are written to hold in any language, framework, or platform. That is a
property of how they're written, not a rule to follow: translate each one into
the idioms your stack offers. The method changes, the requirement does not.
Stack-specific values live in the depth skills below, never in a principle.

| Principle | In short | Skill |
|---|---|---|
| **Quality Over Speed** | Verify robustness; never ship unproven code | `quality-over-speed` |
| **Code is Documentation** | Clear names, obvious structure, minimal comments | `code-is-documentation` |
| **Plans Evolve; Principles Don't** | Pivot when needed, quality standards never change | `plans-evolve-principles-dont` |
| **Root Causes, Not Symptoms** | Fix the thing that's broken, not the symptom | `root-causes-not-symptoms` |
| **Build the Lever** | Automate non-trivial work with scripts, codemods, generators | `build-the-lever` |
| **Encode Lessons in Structure** | Make rules automatic via types, lint, tests, schemas | `encode-lessons-in-structure` |
| **Laziness Protocol** | Delete before adding; smallest change that solves the problem | `laziness-protocol` |
| **Foundational Thinking** | Get data structures right first; logic follows | `foundational-thinking` |
| **Exhaust the Design Space** | Build 2-3 competing prototypes before committing | `exhaust-the-design-space` |
| **Sequence Verifiable Units** | Break work into small, independent, reviewable pieces | `sequence-verifiable-units` |
| **Details Compound** | How it feels is part of whether it works | `details-compound` |
| **Test Behavior, Not Implementation** | Assert what users observe; a test that can't fail is decoration | `test-behavior-not-implementation` |
| **Explain the Number** | Name what limits a measurement before you trust or report it | `explain-the-number` |

## Depth skills

Not principles — recipe layers and methods a playbook step routes into when it needs one.

| Skill | What it holds | Scope |
|---|---|---|
| `web-motion` | Building and reviewing web motion: tool ladder, property tiers, exact curves and durations, gestures, interruption, reduced motion, the review bar. Plus `references/performance.md` — the compositor/paint/layout tier list. Plus `references/recipes.md` — worked technique implementations. | Web only, by design |
| `verify-by-eye` | The proof method for interfaces: use it, slow it down, step the frames, real hardware, degradation passes, fresh eyes | Any stack |
| `mobile-web` | The platform behaviors under a web app on a phone: viewport units, safe areas, tap highlight, `touch-action`, sticky hover, input zoom, overscroll, status bar. Symptom table first. | Mobile web, by design |
| `break-the-ui` | Stress a component with the plausible worst value for every field it renders, behind a dev-only toggle, then report defects separately from design decisions | Any stack |

A depth skill declares its **Scope** on its first lines and is as specific as
the job needs. Entries inside one are labeled **fact** (platform or perceptual
behavior you can verify by observing it), **default** (a sound starting value,
adjust for the product), or **taste** (one house style among several). Treat a
default as a default: these skills are not a rulebook, and an experiment is
free to depart from any of them with a reason.

## Examples

```
/astack-mode plan this feature end-to-end
```
→ Opens the Plan/Scope playbook, steps 1-6

```
/astack-mode this function is slow; optimize it
```
→ Opens the Performance playbook, steps 1-6

```
/astack-mode I don't understand how this codebase works
```
→ Opens the Learn/Understand playbook

```
/astack-mode review my code before I ship
```
→ Opens the Code Review playbook

```
/astack-mode this works but it feels cheap
```
→ Opens the Craft playbook in Debug mode

```
/astack-mode audit the motion in this app
```
→ Opens the Craft playbook in Audit mode — read-only, output is a plan

```
/astack-mode migrate all 300 call sites off the legacy client, I'm going to bed
```
→ No single playbook covers it → Figure It Out designs one, with a committed
decision trail

## The workflow

1. **Invoke** `/astack-mode` with your task
2. **Read** the playbook steps (they're copied into a todo)
3. **Follow** each step, using principles to guide decisions
4. **Verify** at each step (proofs are required)
5. **Handoff** when done (document for others or future you)

Sticky mode: once invoked, `/astack-mode` stays active. Each new message is checked against playbooks. Say "stop" or "exit" to leave.

## Quality gates (non-negotiable)

All code, always:
- **Performant**: Measured, justified, no unnecessary overhead
- **Secure**: No vulnerabilities, validated at boundaries
- **Correct**: Proofs exist (tests, runs, observations)
- **Maintainable**: Clear names, obvious structure, readable by strangers
- **Felt**: For anything a person looks at or touches — it responds, any motion has a purpose, nothing jars, and motion respects reduced-motion preferences

If you can't meet these, say so upfront. Don't ship compromised code.

## Evidence

**Every claim carries its evidence or its label in the same sentence.** Three
labels, no others:

- **Measured.** You ran it and read the result.
- **Inferred.** It follows from evidence you have, but you did not observe it.
- **Guess.** A prediction, or a cause you have not confirmed.

An unlabeled claim reads as measured, so label anything you did not measure.
This applies to the reply, the decision log, the commit message, and the PR
description alike.

"It compiles", "no errors", and "it renders" are not proof of anything but
themselves. A screenshot cannot show timing, interruption, or stutter.

**Never hand over a check you could have run.** If a claim is a guess and
something you could run would settle it, run it first.

## Autonomy

**Just do it.** Reversible work proceeds without asking. Reading, running,
measuring, prototyping, refactoring behind a passing test, committing to a
branch of your own: no permission needed.

**Always pause** for irreversible or outward-facing actions: force-pushing a
shared branch, deploying, deleting data, publishing, and anything that reaches
another person. Approval for one of these never carries to the next.

**The empirical fork.** Before asking "which approach?", "how should I?", or
"what should this do?", classify the question. If the answer is a fact you could
observe by running something — behavior, timing, layout, output, a measurement —
it is not the human's to answer. Sketch it and let the result decide, per
[Exhaust the Design Space](../exhaust-the-design-space/SKILL.md). Reserve the
question for a genuine product or preference call that no experiment can settle.

Read-only work is the exception: on a Learn or an Audit run, answer from the
evidence rather than building a sketch.

**No is an acceptable answer.** Asked whether to do something, invited to add
scope, or shown an approach, give your real judgment. "This doesn't earn its
place" is a complete answer when it's true. A recommendation is a judgment, not
a validation. Agreement is not the default.

## Writing the reply

Write it clean as you draft it. A cleanup pass after drafting does not remove
these patterns.

- **Short declarative sentences.** One thought per sentence.
- **Terse is not an excuse to drop content.** Short sentences, but every section
  the playbook's reply line names stays: decisions, tradeoffs, open questions.
- **Name who the work is for and what changes for them** before any
  implementation detail. Then what the next person who owns this code inherits.
  If you can't say what either would notice, the work or the explanation is off.
- **Never fabricate a link, a citation, or a reference.** Link only artifacts you
  produced or read this session.
- Label every claim, per **Evidence** above.

## When to use other commands

Most of the time, use `/astack-mode` and let it route. But you can invoke any of
the 13 principle skills directly if you already know what you need — see the
table above for their names.

## Handoff

Every playbook ends by running the **Handoff** playbook
(`playbooks/playbook-handoff.md`), which owns the full structure: labeled
evidence, the decision log (decisions, assumptions, tradeoffs, next steps),
readable history, and the reply.

A handoff is not a summary of what you did. It is what the next person needs in
order to continue, disagree, or undo — written for a reader with none of your
context and no way to ask you a question.

---

Let's ship high-quality code. Start with `/astack-mode` and your task.
