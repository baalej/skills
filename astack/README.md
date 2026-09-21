# astack

Your personal engineering system for shipping high-quality code across any tech stack.

**Philosophy:** Quality over speed. Principles over recipes. Verification over assumptions.

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

### 11 Principles

Core values that guide all work. Tech-agnostic, tool-agnostic, model-agnostic.

Located in `principles/`:
1. Quality Over Speed
2. Code is Documentation
3. Plans Evolve; Principles Don't
4. Root Causes, Not Symptoms
5. Tech-Agnostic Approach
6. Build the Lever
7. Encode Lessons in Structure
8. Laziness Protocol
9. Foundational Thinking
10. Exhaust the Design Space
11. Sequence Verifiable Units

### 8 Playbooks

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

### astack-mode

The main entry point. A sticky mode that reads your task, matches it to a playbook, and orchestrates execution.

Located in `astack-mode/SKILL.md`.

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

These are non-negotiable. Don't ship code that fails these gates.

## Principles, not recipes

astack works across any tech stack:
- Languages: JavaScript, Python, Go, Rust, etc.
- Frameworks: React, Django, Express, etc.
- Platforms: Web, CLI, mobile, backend, etc.
- LLMs: Claude, GPT, Copilot, etc.

The principles are universal. The recipes adapt to your tech.

Example: **"Prove it works"** translates to:
- Compiled language → compiler catches type errors
- Interpreted language → tests and linting
- UI → visual testing and user flows
- Backend → integration tests

The method changes; the requirement doesn't.

## Tech-agnostic, solo + collaboration

astack is built for solo work with collaboration support:
- **Solo:** You're the single decision maker
- **Handoff:** Each playbook ends with a handoff step that documents everything so others can pick it up
- **Collaboration:** Comment on decisions, add context, hand off mid-stream

## Other skills

astack ships with:
- **`/unslop`** — Remove AI patterns from writing (already in repo)

Others can be added as needed.

## Philosophy

**Quality over speed.** Throughput without quality is not a goal. Fewer, higher-quality pieces ship better than more slop.

**Principles over recipes.** Adapt the approach to your tech, not the other way around.

**Verification over assumptions.** Prove it works on the real artifact. Don't accept "it compiles" or "no errors."

**Plans evolve; principles don't.** Expect to change direction. The quality standards stay fixed.

**Tech-agnostic.** Works everywhere. Translate principles into your language, framework, platform.

## Getting started

1. Learn the [11 principles](skills/) — skim them; you'll reference them during work
2. Understand the [8 playbooks](skills/astack-mode/playbooks/) — these are your workflows
3. Start with `/astack-mode` and your task

That's it. The system guides you from there.

## Why this approach

Most engineering advice is either vague ("write good code") or too specific ("use TypeScript"). astack bridges that gap:

- **Principles** are universal and tech-agnostic
- **Playbooks** are concrete workflows that reference principles
- **astack-mode** is the orchestrator that brings them together

You get guidance without dogma. Flexibility without chaos.

---

Ship high-quality code. Start with `/astack-mode` and your task.
