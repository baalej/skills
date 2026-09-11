# Source manifest

Kirby version this skill targets: **Kirby 5**.

Tracks where each reference file's content came from and when it was last checked against the live docs. Use this to decide what needs a refresh — see "Keeping this updated" below.

| Reference file | Grounding | Official section | Last verified |
|---|---|---|---|
| `creating-your-site/managing-content.md` | Fetched live | https://getkirby.com/docs/guide/content | 2026-09-11 |
| `creating-your-site/managing-files.md` | Fetched live | https://getkirby.com/docs/guide/files | 2026-09-11 |
| `creating-your-site/rendering-and-logic.md` | Fetched live (templates, snippets, controllers, page models) | https://getkirby.com/docs/guide/templates/basics | 2026-09-11 |
| `creating-your-site/panel-blueprints.md` | Fetched live | https://getkirby.com/docs/guide/blueprints/introduction | 2026-09-11 |
| `creating-your-site/page-builder.md` | Fetched live (using-blocks, custom-blocks) | https://getkirby.com/docs/guide/page-builder | 2026-09-11 |
| `creating-your-site/uuids-permalinks.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/uuids | 2026-09-11 |
| `creating-your-site/virtual-content.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/virtual-content | 2026-09-11 |
| `configuration/configuring-kirby.md` | Fetched live | https://getkirby.com/docs/guide/configuration | 2026-09-11 |
| `configuration/users-permissions.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/users/managing-users | 2026-09-11 |
| `configuration/multi-language.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/languages | 2026-09-11 |
| `configuration/login-sessions.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/authentication/login-methods | 2026-09-11 |
| `configuration/routes.md` | Fetched live | https://getkirby.com/docs/guide/routing | 2026-09-11 |
| `configuration/caching.md` | Fetched live | https://getkirby.com/docs/guide/cache | 2026-09-11 |
| `configuration/emails.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/emails | 2026-09-11 |
| `extending-kirby/plugins.md` | Fetched live (installing, custom-plugins) | https://getkirby.com/docs/guide/plugins/installing-plugins | 2026-09-11 |
| `extending-kirby/databases.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/database | 2026-09-11 |
| `extending-kirby/api.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/api | 2026-09-11 |
| `extending-kirby/headless-integrations.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/beyond-kirby | 2026-09-11 |
| `privacy-security/security.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/security | 2026-09-11 |
| `privacy-security/privacy.md` | General knowledge (stable feature) | https://getkirby.com/docs/guide/kirby-and-privacy | 2026-09-11 |

**"Fetched live"** = the official page was fetched and read in full during this build. **"General knowledge"** = written from well-established, long-stable Kirby behavior plus the confirmed link, without a fresh fetch of that specific page — lower risk than it sounds, since these are mature, slow-moving features, but worth a live fetch before leaning on fine detail (exact config option names, edge-case behavior).

## Keeping this updated

- **Refresh on demand, not on a schedule** — ask to "update the kirby-cms skill" when starting a new project with it, when something here contradicts the live docs, or after a major Kirby release.
- **Check the changelog first**: https://getkirby.com/releases — faster than re-reading every guide page from scratch.
- **Never rewrite blind** — always diff the fetched page against the current reference content and show the changes before applying them.
- **"General knowledge" files are the priority for a first live-fetch pass** if this skill sees heavy use — `users-permissions.md`, `multi-language.md`, `login-sessions.md`, `emails.md`, `databases.md`, `api.md`, `headless-integrations.md`, `uuids-permalinks.md`, `virtual-content.md`, `security.md`, `privacy.md`.
