<!--
source: https://getkirby.com/docs/guide/database
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# Using databases

Kirby ships a lightweight database query builder/abstraction (`Kirby\Database\Database`) for talking to MySQL/SQLite directly — separate from and unrelated to page content storage. Relevant when a project needs to read/write data that genuinely doesn't belong in the flat-file content structure (e.g. a high-volume log, a legacy system's tables, form submissions at scale).

**Project rule:** don't reach for this to store what should be page content — Kirby's own content model (see `creating-your-site/managing-content.md`) is almost always the right place for anything an editor should see/manage in the Panel. This is for genuinely external/relational data only.

→ https://getkirby.com/docs/guide/database
