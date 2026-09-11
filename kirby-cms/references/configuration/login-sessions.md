<!--
source: https://getkirby.com/docs/guide/authentication/login-methods
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# Login & Sessions

Panel authentication ships built-in (email/password, with optional 2FA). Frontend login (a custom login form outside the Panel, e.g. for a members area) uses the same `$kirby->auth()` mechanism but needs to be built manually in a template/controller — it's a documented pattern, not an out-of-the-box UI.

Sessions are cookie-based by default (`Kirby\Session\Session`), configurable via the `session` config option (lifetime, cookie name, etc. — see `configuring-kirby.md`).

**Security note:** never build custom auth logic that bypasses `$kirby->auth()` — password hashing, brute-force throttling, and session handling are already solved there; re-implementing it is a common source of real vulnerabilities.

## Sub-pages
- Panel login → https://getkirby.com/docs/guide/authentication/login-methods
- Second-factor authentication (2FA) → https://getkirby.com/docs/guide/authentication/2fa
- Password reset form → https://getkirby.com/docs/guide/authentication/password-reset-form
- Frontend login → https://getkirby.com/docs/guide/authentication/frontend-login
- Sessions → https://getkirby.com/docs/guide/authentication/sessions
