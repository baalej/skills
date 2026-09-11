<!--
source: https://getkirby.com/docs/guide/cache
kirby_version: 5
last_verified: 2026-09-11
-->

# Caching

**Project default: page caching is OFF.** AGENTS.md §4/§8 deliberately doesn't enable it as a baseline optimization for this template — this file exists for the specific-page-genuinely-needs-it exception, not as a general-purpose "should I cache" reference.

## If a specific page needs it

Enable per-project in `site/config/config.php`, scoped as narrowly as possible:

```php
return [
  'cache' => [
    'pages' => [
      'active' => true,
      'ignore' => fn ($page) => $page->template() !== 'heavy-listing', // only cache what needs it
    ]
  ]
];
```

Cache files land in `site/cache/`. For finer control than a config callback allows, override `isCacheable()` in a page model instead.

## What Kirby will never cache automatically

Requests with a query string, non-GET/HEAD methods, or anything touching `$kirby->session()`, cookies, or the `Authorization` header are excluded automatically — Kirby won't serve one visitor's authenticated/personalized response to another. If a template uses cookies/auth *without* Kirby's own methods, that protection doesn't kick in automatically — call `$kirby->response()->usesCookie($name)` / `usesAuth(true)` explicitly in that case.

## Custom caches (not page caching)

A separate, deliberate cache for something specific (e.g. an external API response) is a different tool from page caching and doesn't conflict with the "no page caching by default" rule:

```php
// config.php
return ['cache' => ['api' => true]];

// controller
$apiCache = $kirby->cache('api');
if (!$data = $apiCache->get('key')) {
    $data = Remote::get('https://slow-external-api.com')->content();
    $apiCache->set('key', $data, 30); // minutes
}
```

This is the right tool when a template depends on a slow external call, not general page caching — evaluate case by case.

→ https://getkirby.com/docs/guide/cache
