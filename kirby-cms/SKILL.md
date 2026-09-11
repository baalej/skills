---
name: kirby-cms
description: Domain knowledge for building with Kirby CMS 5 — templates, snippets, controllers, page models, blueprints, fields, the block-based page builder, plugins, routes, caching, multi-language, and more. Use this whenever a task involves writing or modifying Kirby PHP code, blueprints (YAML), or panel configuration, or when the user asks how to implement something with Kirby's API. Always consult it before writing Kirby-specific code, even for tasks that seem simple — Kirby has its own conventions (e.g. controllers vs. page models, snippet slots, blueprint query language) that are easy to get subtly wrong from general PHP knowledge alone.
---

# Kirby CMS 5 — Reference Skill

Practical, project-integration-aware notes on Kirby CMS, organized to mirror Kirby's own docs navigation (getkirby.com/docs/guide) so it's easy to keep in sync. Each reference file is a short summary — how a feature works and how it should be used *in this project's conventions* — followed by a link to the full official page for anything not covered here.

This skill is **domain knowledge about Kirby itself**. Project-specific conventions (BEM, no bundler, asset folder structure, accessibility thresholds, etc.) live in the project's own `AGENTS.md` — read both when working on a Kirby template.

## How to use this skill

1. Identify which topic the task touches (templates? blueprints? plugins? routing?).
2. Open the matching reference file below — don't read all of them, just the relevant one(s).
3. If the reference file doesn't cover the specific detail you need, follow its link to the official docs and fetch that page.
4. If something in a reference file looks wrong or outdated, flag it — see `references/_sources.md` for how this skill stays current.

## Reference index

Mirrors getkirby.com/docs/guide exactly, section by section.

### Creating your site
- `references/creating-your-site/managing-content.md` — pages, fields, publishing workflow, text formatting
- `references/creating-your-site/managing-files.md` — files in the panel, thumbnails, resources
- `references/creating-your-site/rendering-and-logic.md` — **templates, snippets, controllers, page models, PHP API, collections, content representations, escaping** — read this for almost any template/PHP task
- `references/creating-your-site/panel-blueprints.md` — **blueprints, fields, layout, query language, extending/translating blueprints** — read this for almost any panel/content-model task
- `references/creating-your-site/page-builder.md` — the blocks field, custom blocks, fieldsets
- `references/creating-your-site/uuids-permalinks.md` — unique IDs, permalinks
- `references/creating-your-site/virtual-content.md` — virtual pages, content from APIs/DBs/CSV/RSS

### Configuration
- `references/configuration/configuring-kirby.md` — config.php, custom folder/URL setup, multisite
- `references/configuration/users-permissions.md` — users, roles, permissions
- `references/configuration/multi-language.md` — multi-language setup, translations, RTL
- `references/configuration/login-sessions.md` — panel login, 2FA, frontend login, sessions
- `references/configuration/routes.md` — custom routes
- `references/configuration/caching.md` — Kirby's cache system
- `references/configuration/emails.md` — sending emails

### Extending Kirby
- `references/extending-kirby/plugins.md` — installing, building, and structuring plugins
- `references/extending-kirby/databases.md` — database queries
- `references/extending-kirby/api.md` — Kirby's REST API, authentication
- `references/extending-kirby/headless-integrations.md` — headless setups

### Privacy & security
- `references/privacy-security/security.md`
- `references/privacy-security/privacy.md`

## Status of this skill

All 20 reference files are populated with the hybrid format (summary + project notes + links). Most were grounded by fetching the live docs during this build; a handful of stable, long-established features (UUIDs, virtual content, users/roles, multi-language, login/sessions, emails, databases, API, headless, security, privacy) were written from established Kirby knowledge plus a verified link rather than a fresh fetch — see `references/_sources.md` for exactly which, and treat those as the priority list for the next live-verification pass.
