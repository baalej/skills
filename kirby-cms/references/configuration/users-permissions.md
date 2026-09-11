<!--
source: https://getkirby.com/docs/guide/users/managing-users
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# Users & permissions

Users are stored under `site/accounts/` (not `content/`) with a role assigned per user. Roles are blueprints (`site/blueprints/users/[role].yml`) that define both the Panel fields a user of that role sees and their **permissions** — what actions (create/edit/delete pages, access settings, etc.) that role is allowed.

**Project default:** ship with the built-in `admin`/`editor` roles unless the project has a real reason for a custom role (e.g. a client's editorial team that should only touch content, never settings/users). Don't create a custom role speculatively "in case it's needed later."

## Sub-pages
- Managing users → https://getkirby.com/docs/guide/users/managing-users
- Roles → https://getkirby.com/docs/guide/users/roles
- Permissions → https://getkirby.com/docs/guide/users/permissions
