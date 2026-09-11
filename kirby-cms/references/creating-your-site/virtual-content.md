<!--
source: https://getkirby.com/docs/guide/virtual-content
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# Virtual content

Pages/files that don't exist as real folders in `content/` — constructed at runtime as `Page`/`File` objects (usually from a route, see `configuration/routes.md`) and fed with data from an external source instead of a `.txt` file.

```php
return new Page([
  'slug' => 'virtual-reality',
  'template' => 'virtual-page',
  'content' => ['title' => 'Not a real page', 'text' => 'From an API, a DB, wherever.'],
]);
```

**When to reach for this:** content that lives in another system of record (a product catalog API, a CSV export, a spreadsheet) and shouldn't be duplicated into Kirby's content folder — render it as virtual pages instead of syncing it into `.txt` files.

**Security note:** virtual content built from external/dynamic data must be sanitized before use — this is the one content path where Kirby's normal content-folder safety assumptions don't automatically apply (see `privacy-security/security.md`).

## Sub-pages
- Simple virtual page → https://getkirby.com/docs/guide/virtual-content/simple-virtual-page
- Content from an API → https://getkirby.com/docs/guide/virtual-content/content-from-api
- Content from a database → https://getkirby.com/docs/guide/virtual-content/content-from-database
- Content from a spreadsheet (CSV) → https://getkirby.com/docs/guide/virtual-content/content-from-csv
- Content from an RSS feed → https://getkirby.com/docs/guide/virtual-content/content-from-rss-feed
- Virtual pages from an image gallery → https://getkirby.com/docs/guide/virtual-content/virtual-pages-image-gallery
- Virtual files → https://getkirby.com/docs/guide/virtual-content/virtual-files
- Merging virtual + local content sources → https://getkirby.com/docs/guide/virtual-content/merging-virtual-and-local-content
- Content locking with virtual pages → https://getkirby.com/docs/guide/virtual-content/content-locking
