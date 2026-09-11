<!--
source: https://getkirby.com/docs/guide/plugins/installing-plugins, /custom-plugins
kirby_version: 5
last_verified: 2026-09-11
-->

# Plugins

A plugin is a folder under `site/plugins/` with an `index.php` (and optionally `index.css`/`index.js`, auto-loaded into the Panel). Kirby loads every folder it finds there automatically — no registration step beyond the file existing.

## Registering a plugin

```php
// site/plugins/my-plugin/index.php
Kirby::plugin('my-name/my-plugin', [
  'snippets' => ['header' => __DIR__ . '/snippets/header.php'],
  'templates' => ['blog' => __DIR__ . '/templates/blog.php'],
  'hooks' => [
    'page.delete:before' => function () { throw new Exception('Nope'); }
  ]
]);
```

**Naming:** `{author}/{plugin-name}`, lowercase + dashes only, no `kirby-` prefix and no version number baked into the name (`my-name/my-plugin`, not `my-name/kirby-my-plugin` or `my-name/kirby5-my-plugin`) — that prefix/version convention is for the Composer package name instead, which can differ.

**Panel-only plugin** (just CSS/JS, no PHP extensions): `index.php` still needs `Kirby::plugin('name', [])` with the explicit empty array — omitting the second argument turns the call into a getter instead of a registration.

## When to reach for a plugin vs. a local helper

A single helper function or two → just define it in `site/plugins/helpers/index.php` (no `Kirby::plugin()` needed for plain functions). Anything that **extends Kirby itself** — hooks, custom fields, custom blocks with preview logic, KirbyTags, routes, page models shared across projects — needs `Kirby::plugin()`.

## Recommended plugin folder structure

```
site/plugins/my-plugin/
├── index.php
├── assets/        # served at /media/plugins/{author}/{plugin}/
├── blueprints/
├── fields/
├── snippets/
├── tags/
└── templates/
```

## Plugin options

```php
Kirby::plugin('my-name/my-plugin', ['options' => ['apiKey' => 'default']]);
```
Auto-prefixed (`my-name.my-plugin.apiKey`), overridable from the site's own `config.php` using that same prefixed key — avoids collisions between plugins.

**Project rule (AGENTS.md §2):** plugins live in `site/plugins/`, distinct from project-local snippets/blocks — use a plugin only when the extension needs to hook into Kirby's system (routes, hooks, custom fields), not as a general place to dump helper code that a controller or page model would fit better.

→ Installing: https://getkirby.com/docs/guide/plugins/installing-plugins · Custom plugins: https://getkirby.com/docs/guide/plugins/custom-plugins · Plugin types (full extension list): https://getkirby.com/docs/guide/plugins/plugin-types · Best practices: https://getkirby.com/docs/guide/plugins/best-practices
