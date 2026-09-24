# Getting Started with astack

This guide walks you through a real example: **Building a user authentication feature** from planning through shipping.

## What to expect

When you invoke `/astack-mode` with a task:

1. **It matches to a playbook** (Plan, Design, Build, Fix, Refactor, Review, Learn, Perf, Craft)
2. **A todo list opens** with 6 steps
3. **You follow each step**, using principles to guide decisions
4. **At each step, you verify** the work is correct
5. **You ship with confidence**—quality is guaranteed

---

## Example: Build a User Authentication Feature

### Setup

You're solo. You want to build user authentication (sign up, login, password reset) for a web app.

### Step 1: Invoke astack-mode

```
/astack-mode build user authentication: sign up, login, password reset. 
End-to-end feature. tech stack: node + react
```

astack-mode reads this and matches it to: **Plan/Scope Playbook**

(Why? Because you haven't done this before, you're describing a feature, and you haven't mentioned an existing design.)

### Step 2: Playbook opens with a todo

The **Plan/Scope playbook** now guides you through:

1. **Ground the Problem** — Define outcome, constraints, quality gates
2. **Explore the Design Space** — Sketch 2-3 approaches
3. **Break Into Phases** — Sequence the work
4. **Anticipate Change** — Document assumptions
5. **Cut Scope** — Apply Laziness Protocol
6. **Handoff** — Document for others/future you

---

## Walking through each step

### Step 1: Ground the Problem

**What to do:**
- Define user outcome: "Users can create accounts, log in, reset forgotten passwords"
- Define constraints:
  - Performance: Login should be <200ms
  - Security: Passwords never logged, HTTPS only, rate-limit login attempts
  - Correctness: Failed logins don't create accounts; sessions don't leak
  - Maintainability: Code is clear, new dev understands in 5 minutes
- Non-negotiable quality gates: All four must hold

**Your output:**
```
## User Authentication Feature - Planning Brief

### Outcome
Users can sign up with email/password, log in, and reset forgotten passwords.
Used by: web app, mobile app (planned for Q2)

### Constraints
- Timeline: 2 weeks
- Security: HTTPS, rate-limit, no password logging
- Performance: <200ms login, <100ms verification
- Scale: 1000 concurrent users (MVP)

### Quality Gates (Non-negotiable)
- Performance: Measured against baseline; <200ms login
- Security: No password leaks; rate-limiting in place
- Correctness: Session hijacking impossible; logout works
- Maintainability: Clear code; new dev onboards in 1 day
```

**How you know it's done:**
- One-page brief complete
- All stakeholders agree on outcome + constraints
- Quality gates are specific and measurable

---

### Step 2: Explore the Design Space

**What to do:**
- Sketch 3 different architectures:
  - **Design A**: Stateless JWT + database user table
  - **Design B**: Server sessions + Redis cache
  - **Design C**: OAuth delegation to third party
- Evaluate each on: simplicity, flexibility, security, performance
- Choose the best; document tradeoffs

**Your output (simplified):**

```
## Design Options

### Design A: Stateless JWT
Pros: Simple, fast, scalable
Cons: Harder to revoke; logout is tricky
Verdict: Good for mobile; risky for web without careful design

### Design B: Server Sessions + Redis
Pros: Easy logout; strong security
Cons: Requires Redis; not as scalable; per-user storage
Verdict: Solid choice; standard approach

### Design C: OAuth (Google/GitHub)
Pros: User doesn't manage password; strong security
Cons: Depends on external provider; no password reset flow
Verdict: Good for future; add after core auth works

### Chosen: Design B (Server Sessions + Redis)
Why: Simplest for MVP; security is strong; logout is clean
Tradeoff: Need Redis infrastructure; slightly less scalable than JWT
Future: Can add OAuth in phase 2
```

**How you know it's done:**
- 3 genuinely different designs sketched
- Comparison on: simplicity, security, flexibility
- Decision documented with reasoning

---

### Step 3: Break Into Phases

**What to do:**
- Sequence the work (foundational → features → verification)
- Each phase is independently deployable
- Identify high-risk pieces; plan how to de-risk early

**Your output:**

```
## Implementation Phases

### Phase 1: Scaffold (Foundational)
- User data model (id, email, password_hash, created_at)
- Session data model (session_id, user_id, expires_at)
- Database schema; indexes on email, session_id
- Auth middleware (verify session, attach user to request)
Verification: Can create user; can start session; middleware works
Risk: None; foundation only

### Phase 2: Sign Up + Login (Features)
- Sign up endpoint: validate email, hash password, create user
- Login endpoint: find user, verify password, create session
- Logout endpoint: destroy session
- Error handling: duplicate email, wrong password, not found
Verification: Manual testing; auth flows work end-to-end
Risk: Medium; password handling must be correct

### Phase 3: Password Reset (Features)
- Generate reset token; email it to user
- Verify token; allow password change
- Invalidate all sessions after reset (security)
Verification: Manual flow; token expiry works; sessions cleared
Risk: High; email delivery; token security

### Phase 4: Integration + Security Audit (Verification)
- Rate-limit login attempts (prevent brute force)
- HTTPS enforcement
- Security review (no password logs, no token leaks)
- Load test (100 concurrent logins)
Verification: Rate limiting works; performance baseline met
Risk: Low; mostly defensive

### Phase 5: Documentation + Handoff
- API documentation (endpoints, errors)
- Deployment guide
- Runbook for password reset troubleshooting
Verification: New dev can deploy without questions
Risk: None; documentation only
```

**How you know it's done:**
- Phases are sequential (each enables the next)
- Each phase is independently verifiable
- High-risk pieces (password reset) are identified and de-risked

---

### Step 4: Anticipate Change

**What to do:**
- What assumptions might be wrong?
- How will you know early if an assumption breaks?
- What's rigid vs. flexible?

**Your output:**

```
## Assumptions & Change Management

### Assumptions
1. Redis will be available (not containerized initially)
   - Early signal: Day 1, can we connect to Redis?
   
2. Email delivery is reliable
   - Early signal: Test email in phase 3; if it's slow, pivot to async queue
   
3. 1000 concurrent users is the load target
   - Early signal: Load test in phase 4; if we're slower, optimize sessions
   
4. No third-party OAuth required (MVP)
   - Early signal: User feedback; can add in Q2 if needed

### Rigid (Quality Gates - Cannot Change)
- Performance must be <200ms (measured, non-negotiable)
- Security: passwords never logged
- Sessions must be invalidated on password reset

### Flexible (Can Evolve)
- Email provider (could switch to SendGrid)
- Session storage backend (could move from Redis to database)
- Rate limit strategy (can adjust thresholds)

### If Assumptions Break
- If Redis unavailable → switch to database sessions (lose some performance)
- If email too slow → add async queue (adds complexity)
- If load exceeds 1000 → optimize or scale horizontally
```

**How you know it's done:**
- Key assumptions listed
- Each assumption has an early signal
- Rigid vs. flexible parts are clear

---

### Step 5: Cut Scope

**What to do:**
- Apply Laziness Protocol: what's core? Nice-to-have?
- Cut everything that isn't solving the immediate problem

**Your output:**

```
## Scope: MVP vs. Future

### MVP (This Sprint)
- Email/password sign up
- Email/password login
- Password reset (via email)
- Session management (logout)
- Rate limiting on login
- Basic error messages

### NOT MVP (Future)
- Multi-factor authentication
- Social login (Google, GitHub, Discord)
- Single sign-on (SAML/OIDC)
- Email verification (sent, but not required)
- Account recovery questions
- Login history / device tracking

Rationale: MVP solves the core problem (users can authenticate). 
Everything else is polish or security theater. Add after MVP ships and gets user feedback.
```

**How you know it's done:**
- Clear MVP vs. future split
- Each cut feature is justified ("Why not in MVP?")

---

### Step 6: Handoff

**What to do:**
- Document decisions, assumptions, next steps
- Make it so someone else (or future you) can pick it up

**Your output:**

```
## Decision Log

### Chosen Architecture: Server Sessions + Redis
- Why: Simple, secure, clear logout
- Tradeoff: Requires Redis; less scalable than JWT
- Reconsidered: Design B over A (JWT) and C (OAuth)
- Next: Can add OAuth in Q2 if user demand

### Timeline: 2 weeks
- Phase 1-2: Days 1-3 (scaffold + core flows)
- Phase 3: Days 4-6 (password reset, trickiest part)
- Phase 4: Days 7-9 (security, load test)
- Phase 5: Days 10-14 (docs, deployment, handoff)

### High-Risk Areas
1. Password reset email delivery (Day 4)
   - Mitigate: Test email flow on Day 1
2. Load testing (Day 8)
   - Mitigate: Performance profile early, not last-minute
3. Security audit (Day 9)
   - Mitigate: Review code daily for password/token leaks

### Not Included (Explicitly Cut)
- MFA, OAuth, device tracking
- Reason: MVP scope; revisit after launch

### Done criteria
- All 4 quality gates met (performance, security, correctness, maintainability)
- Phases 1-5 complete
- Code reviewed; no quality issues
- Deployment guide written
```

**How you know it's done:**
- All decisions documented
- Someone else could start Phase 1 tomorrow
- No ambiguity about what comes next

---

## Now: Moving to Design

You've completed **Plan/Scope**. astack-mode recognizes this and asks: **Next?**

You say: `/astack-mode design this auth system; detail the API surface and session storage`

astack-mode now routes to the **Design/Architecture playbook**, which walks through:
1. Ground existing systems
2. Sketch competing designs (stateless vs. stateful sessions, Redis vs. database)
3. Evaluate red flags
4. Choose + document tradeoffs
5. Validate the interface
6. Handoff to build

---

## Then: Moving to Build

After Design, you say: `/astack-mode build auth. start with scaffolding, phases 1-5`

astack-mode routes to the **Build a Feature playbook**:
1. Scaffold (data models, types, middleware)
2. Implement in small units (phase 1, then 2, etc.)
3. Verify each unit works
4. Self-review code quality
5. Integration test the whole feature
6. Handoff (docs, commit messages, decision log)

At each phase, you:
- Write code
- Test on real artifact (run the app, try login)
- Verify against principles (code-as-documentation, root-causes, etc.)
- Commit with clear messages
- Move to next phase only when current is verified

---

## Key principles throughout

**Quality Over Speed** — You don't move to phase 2 until phase 1 passes all tests and quality gates

**Code is Documentation** — Function names are clear; no comments saying "this hashes the password"; structure is obvious

**Foundational Thinking** — Session data model is designed first; implementation follows

**Sequence Verifiable Units** — Each phase is a separate commit; each stands alone; the sequence proves correctness

**Root Causes, Not Symptoms** — If login is slow, you profile to find the bottleneck (N+1 query? slow hash? network?), then fix there

**Encode Lessons** — If you discover "never log passwords," you add a lint rule to prevent it next time

---

## When things change

### Scenario: You discover email is too slow

During Phase 3, you find password reset emails take 5 seconds.

**Apply: Plans Evolve; Principles Don't**

- The plan changes: Add async email queue
- Quality standards don't change: Still fast (<200ms), still secure
- You re-verify: Measure new performance; confirm emails are queued correctly
- You document: "Email was slow; added async queue; +1 day"

The whole system adapts while quality stays guaranteed.

---

## Summary: The astack Flow

```
Your task
    ↓
/astack-mode matches to playbook
    ↓
Playbook opens with 6 steps
    ↓
Step 1 → Step 2 → Step 3 → Step 4 → Step 5 → Step 6
(Ground)  (Design) (Plan)  (Assume) (Cut)    (Handoff)
    ↓
You follow each step, using principles
    ↓
Each step is verified (checklist, testing, review)
    ↓
Next playbook (Design, then Build, then Review)
    ↓
Repeat until shipped
    ↓
Done: High-quality code, decisions documented
```

---

## Tips

1. **Don't skip steps.** Each step builds on the previous. Skipping "Ground the Problem" means you'll make wrong decisions later.

2. **Verify before moving on.** If Step 2 doesn't feel solid, do it again. Don't push to Step 3 with doubt.

3. **Principles are your guide.** When you're unsure, ask: "Which principle applies here?" (e.g., "This feels over-engineered" → Laziness Protocol).

4. **Handoff at every step.** You're solo, but pretend you're handing off to a teammate. That clarity will save you time.

5. **Use astack-mode as sticky mode.** Once invoked, it stays active. Keep talking; it routes naturally.

---

## Next: Start your own task

Ready? Type:

```
/astack-mode [your task]
```

astack-mode will recognize your task, match it to a playbook, and guide you through. Trust the system. Trust the principles.

Ship high-quality code.
