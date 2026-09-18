---
name: astack-mode
description: Main entry point for astack. Matches tasks to playbooks and orchestrates work.
---

# astack-mode

Your personal engineering system for shipping high-quality code. Start here.

## How it works

Type `/astack-mode` with your task. This skill:

1. **Matches your task to a playbook** (Plan, Design, Build, Fix, Refactor, Review, Learn, Perf)
2. **Opens a todo list** with the playbook's steps
3. **Routes to other skills** when a step needs depth
4. **Stays active** (sticky mode) across turns
5. **Guides execution** using your 11 principles

## The playbooks

| Playbook | Use when |
|---|---|
| **Plan/Scope** | Planning a feature end-to-end |
| **Design** | Designing architecture before coding |
| **Build** | Building a feature from a design |
| **Fix** | Fixing a bug or issue |
| **Refactor** | Improving code structure |
| **Review** | Reviewing your own code |
| **Learn** | Understanding existing code |
| **Perf** | Optimizing performance |

## The 11 principles

Your system is built on 11 core principles that guide all work:

1. **Quality Over Speed** — Verify robustness; never ship unproven code
2. **Code is Documentation** — Clear names, obvious structure, minimal comments
3. **Plans Evolve; Principles Don't** — Pivot when needed, quality standards never change
4. **Root Causes, Not Symptoms** — Fix the thing that's broken, not the symptom
5. **Tech-Agnostic Approach** — Principles guide work; adapt recipes to your stack
6. **Build the Lever** — Automate non-trivial work with scripts, codemods, generators
7. **Encode Lessons in Structure** — Make rules automatic via types, lint, tests, schemas
8. **Laziness Protocol** — Delete before adding; smallest change that solves the problem
9. **Foundational Thinking** — Get data structures right first; logic follows
10. **Exhaust the Design Space** — Build 2-3 competing prototypes before committing
11. **Sequence Verifiable Units** — Break work into small, independent, reviewable pieces

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

If you can't meet these, say so upfront. Don't ship compromised code.

## When to use other commands

Most of the time, use `/astack-mode` and let it route. But you can invoke individual skills if you already know what you need:
- `/unslop` — Remove AI patterns from writing

## Handoff structure

When a playbook completes, handoff includes:
- **Decision log** — What was decided and why
- **Assumptions** — What might change
- **Tradeoffs** — What we're optimizing for
- **Next steps** — What comes next

Make it so someone else (or future you) can pick it up without questions.

---

Let's ship high-quality code. Start with `/astack-mode` and your task.
