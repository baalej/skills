<!--
source: https://getkirby.com/docs/guide/uuids
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# Unique IDs & Permalinks

Every page/file/user gets an immutable UUID (`page://xxxxx`) independent of its slug/path. Use `$page->uuid()->toString()` to get it, and `Page::for('uuid-string')` / `page('page://xxxxx')` to resolve it back to an object. Kirby also generates a permalink URL (`/@/page/xxxxx`) that always resolves regardless of later slug/URL changes.

**When this matters:** if content ever links to other content **by reference** (a "related pages" field pointing at another page), prefer storing/resolving via UUID over a hardcoded slug/path — renaming or moving the target page won't break the reference. For a `pages` or `files` field type, Kirby already stores UUIDs under the hood; this only matters when writing custom relation logic by hand.

→ https://getkirby.com/docs/guide/uuids
