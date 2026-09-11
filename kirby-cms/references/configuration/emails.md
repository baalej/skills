<!--
source: https://getkirby.com/docs/guide/emails
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# Sending emails

Kirby has a built-in `Email` class for sending mail (contact forms, notifications) via PHP's `mail()`, SMTP, or a custom transport, configured through the `email` config option. Typical use: a controller handling a POST route builds an `Email` object with a template, then calls `->send()`.

**Project rule:** validate/sanitize all form input server-side before it reaches an email body — this is a common injection vector (header injection via unescaped `From`/`Reply-To` fields) if user input goes straight into email headers.

→ https://getkirby.com/docs/guide/emails
