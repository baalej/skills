<!--
source: https://getkirby.com/docs/guide/templates/basics (and sibling pages under /guide/templates/)
kirby_version: 5
last_verified: 2026-09-11
-->

# Rendering & logic

How Kirby turns content into HTML: templates, snippets, controllers, page models, and the core PHP API.

## Templates

One `.php` file per content type in `site/templates/`, named to match the template of the content file (e.g. `project.txt` → `templates/project.php`). `default.php` is the only required template — Kirby falls back to it when no matching template exists.

Every template gets `$site`, `$page`, and `$pages` available automatically. Field values are pulled with method calls: `$page->title()`, `$page->text()->kirbytext()`. Field names that collide with native Kirby methods (`image`, `video`, `num`...) must be accessed via `$page->content()->image()` instead of `$page->image()`.

**Project rule (AGENTS.md §3):** templates only print/format — any computation goes in a controller or page model, never inline in the template.

→ https://getkirby.com/docs/guide/templates/basics

## Snippets

Reusable `.php` partials in `site/snippets/`, included with `snippet('name')`. Support subfolders (`snippet('components/card')`), passed variables (`snippet('card', ['title' => ...])` or `compact('article')`), and — since Kirby 5 — **named slots**:

```php
<?php snippet('article', slots: true) ?>
  <?php slot('header') ?><h1>Title</h1><?php endslot() ?>
  <?php slot('body') ?><p>Text</p><?php endslot() ?>
<?php endsnippet() ?>
```

The snippet reads them via `$slots->header()`, `$slots->body()`, or the unnamed default slot via `$slot`. An **open snippet with no matching `endsnippet()`** is a valid pattern for shared page layouts (`layout.php` wrapping the whole page) — Kirby auto-closes it at the end of the template.

Snippet alternatives/fallbacks: `snippet(['articles/' . $page->postType(), 'articles/default'])`.

**Project rule (AGENTS.md §2.2):** each snippet's CSS/JS lives at the mirrored path under `assets/css/snippets/` — see that section before adding a new snippet.

→ https://getkirby.com/docs/guide/templates/snippets

## Controllers

`site/controllers/[name].php`, named exactly like the template it serves. Returns an anonymous function; whatever array it returns becomes variables available in the matching template:

```php
<?php
return function ($page) {
  $articles = $page->children()->listed()->flip()->paginate(20);
  return ['articles' => $articles, 'pagination' => $articles->pagination()];
};
```

Kirby injects `$site`, `$page`, `$pages`, `$kirby` into the function automatically by parameter name — order doesn't matter, only the name does.

A general `site.php` controller runs for every template and its return values get merged as defaults under any page-specific controller.

**Project rule:** this is where "no logic in templates" (AGENTS.md §1) actually lives — if a template needs a loop with filtering/sorting/pagination, that belongs here, not inline.

→ https://getkirby.com/docs/guide/templates/controllers

## Page models

`site/models/[name].php`, one PHP class per content type extending Kirby's `Page` class, named `{TemplateName}Page` (dashes/underscores stripped from the class name only, not the filename). A page model's methods are available everywhere that page type is referenced — templates, snippets, controllers, other models.

```php
<?php
class ProjectPage extends Page {
  public function cover() {
    return $this->image('cover');
  }
}
```

A `DefaultPage` class in `site/models/default.php` extends any page type without its own model. You can also override built-in methods (`parent::images()->sortBy(...)`), but do this carefully — it changes Kirby's default behavior everywhere.

**Controller vs. page model — when to use which:** a controller prepares data *for one template's render*; a page model adds a reusable method *to the page object itself*, usable anywhere that page type appears (not just its own template). If the same computed value is needed in a snippet included from multiple templates, it belongs in a page model, not a controller.

→ https://getkirby.com/docs/guide/templates/page-models

## PHP API, collections, content representations, escaping

Quick pointers — these are more reference-heavy than pattern-heavy, so mostly linking out:

- **PHP API** — `$page`, `$site`, `$pages`, `$files`, `$kirby` objects and their chainable methods (`->children()`, `->filterBy()`, `->sortBy()`...). → https://getkirby.com/docs/guide/templates/php-api
- **Collections** — Kirby's `Pages`/`Files`/`Users` collections support filtering, sorting, pagination, grouping with a fluent, chainable API. Prefer chaining over manual loops+conditionals when filtering content. → https://getkirby.com/docs/guide/templates/collections
- **Content representations** — a template can render alternate formats (`project.json.php`, `project.rss.php`) for the same content, selected via file extension in the URL. Useful for feeds/APIs without a separate plugin. → https://getkirby.com/docs/guide/templates/content-representations
- **Escaping content** — always escape user-facing output (`->esc()` / `->html()` field methods). This is already covered as a hard rule in AGENTS.md §3, this link is for the mechanics/edge cases. → https://getkirby.com/docs/guide/templates/escaping
