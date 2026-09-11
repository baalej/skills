<!--
source: https://getkirby.com/docs/guide/security
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# Secure your project

Kirby's own security guide covers: filtering/sanitizing input (especially relevant for virtual content built from external data, see `creating-your-site/virtual-content.md`), keeping Kirby core and plugins updated, file upload restrictions (Kirby already blocks dangerous extensions like `.php`/`.html` by default — don't weaken this), HTTPS enforcement, and Panel access hardening (strong passwords, 2FA, restricting `debug` to `false` in production).

**Project rules already covered elsewhere, restated here for visibility:**
- Always escape output (AGENTS.md §3, `rendering-and-logic.md` → Escaping content).
- Never commit `.env`/credentials (AGENTS.md §8).
- Validate/sanitize form input before it reaches email headers, virtual content, or raw SQL (see `configuration/emails.md`, `creating-your-site/virtual-content.md`).

→ https://getkirby.com/docs/guide/security
