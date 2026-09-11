<!--
source: https://getkirby.com/docs/guide/blueprints/introduction (and sibling pages under /guide/blueprints/)
kirby_version: 5
last_verified: 2026-09-11
-->

# Panel & blueprints

Blueprints are YAML files that configure the Panel (Kirby's admin UI) — what fields editors see, how they're arranged, and what data they produce.

## Blueprint types and locations

| Type | Location | Controls |
|---|---|---|
| Site | `site/blueprints/site.yml` | The dashboard / site-wide fields |
| Pages | `site/blueprints/pages/*.yml` | One per page template |
| Files | `site/blueprints/files/*.yml` | Panel setup per file type |
| Users | `site/blueprints/users/*.yml` | Panel setup + permissions per role |
| Blocks | `site/blueprints/blocks/*.yml` | Custom fieldsets for the blocks field (see `page-builder.md`) |

**Project rule (AGENTS.md §2):** one blueprint per content type, avoid monolithic blueprints with dozens of fields — modularize with blocks or structure fields instead (§6 has the criteria for choosing between the two).

→ https://getkirby.com/docs/guide/blueprints/introduction

## Fields

Fields break content into structured pieces instead of one big text blob. Defined per-blueprint under a `fields:` key, each with at least a `type`. Kirby ships a large set of built-in field types (text, textarea, structure, blocks, select, checkboxes, date, files, pages, users, etc.) — check the field reference rather than assuming a type exists from memory, the exact options per field type change between versions.

**Naming rule:** field names may only use letters, numbers, and underscores — no dashes (`field_1`, not `field-1`).

→ https://getkirby.com/docs/guide/blueprints/fields · full field reference: https://getkirby.com/docs/reference/panel/fields

## Layout (tabs, columns, sections)

For anything beyond a flat list of fields, blueprints support **tabs** (top-level groupings), **columns** (side-by-side layout within a tab), and **sections** (fields, pages, files, or info boxes grouped together). This is what makes a content-heavy page type usable for an editor instead of one long scrolling form.

→ https://getkirby.com/docs/guide/blueprints/layout

## Query language

A dot-notation query language mirrors the PHP API for use *inside* YAML (e.g. dynamic labels, conditional field visibility, default values pulled from other fields) without writing PHP in a blueprint. Reach for this before reaching for a plugin hook when the need is just "show this field's default/label based on another field's value."

→ https://getkirby.com/docs/guide/blueprints/query-language

## Reusing & extending blueprints

Fields, sections, tabs, and whole blueprint layouts can be extracted into separate files and pulled into multiple blueprints — the YAML equivalent of a reusable snippet. Relevant directly to this project's "reusability" priority (AGENTS.md §1, §6): if two blueprints share a field group (e.g. SEO fields, a shared "hero" section), extract it once instead of pasting it into every blueprint that needs it.

→ https://getkirby.com/docs/guide/blueprints/extending-blueprints

## Translating blueprints

Blueprint titles, field labels, section labels, help text, and option labels can all be translated for multi-language Panel usage — separate from translating the *content* itself (see `configuration/multi-language.md`). Only relevant when the project's editorial team is multi-language, not just the frontend.

→ https://getkirby.com/docs/guide/blueprints/translations

## Example blueprints & full reference

Kirby maintains a set of example blueprints (blog, shop, portfolio...) worth checking before designing a content model from scratch: https://getkirby.com/docs/reference/panel/samples
Full field/section/layout reference: https://getkirby.com/docs/reference/panel
