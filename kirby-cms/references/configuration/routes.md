<!--
source: https://getkirby.com/docs/guide/routing
kirby_version: 5
last_verified: 2026-09-11
-->

# Routes

Kirby's router lets a URL pattern resolve to custom logic instead of a content-folder page — for redirects, virtual endpoints, custom APIs, or shortened URLs.

## Defining a route

In `site/config/config.php` (or a plugin, same shape):

```php
return [
  'routes' => [
    [
      'pattern' => 'blog/tag/(:any)',
      'action'  => function ($tag) {
        return page('blog')->render(['tag' => $tag]);
      }
    ],
  ]
];
```

Placeholders: `(:any)` (until next slash), `(:all)` (everything incl. slashes), `(:num)`, `(:alpha)`, `(:alphanum)`. Prefer the narrowest one that fits — `(:any)` also matches content representations like `.json`, which is a common source of accidentally-broken routes.

## What an action can return

A `Page`, a `File`, a raw HTML/JSON string, `false`/`null`/`''` (→ 404), a `Response` object, or throw an `Exception`. `go($url, $code = 302)` is the standard redirect helper.

## Passing data to a controller

```php
return page('blog')->render(['tag' => $value]);
```
→ received in `site/controllers/blog.php` as `function ($page, $tag) { ... }` (see `rendering-and-logic.md`).

## Multi-language routes

Must call `$site->visit($page, $language)` to properly activate a page+language. Set `'language' => '*'` on a route to make it respond across all configured languages, or a specific code to scope it to one.

## `next()`

Inside a route, `$this->next()` tells Kirby to keep trying other matching routes instead of stopping here — useful for "intercept if found, otherwise fall through to normal routing" patterns (e.g. flattening a URL for one section without breaking every other page).

**Project rule:** routes are for structural URL needs (redirects, virtual endpoints, flattened URLs) — not a substitute for controllers. If the goal is just "prepare data for a template," use a controller (see `rendering-and-logic.md`), not a route.

→ https://getkirby.com/docs/guide/routing
