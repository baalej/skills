<!--
source: https://getkirby.com/docs/guide/files
kirby_version: 5
last_verified: 2026-09-11
-->

# Managing files

Files belong either to the `Site` object (stored directly in `content/`) or to a specific `Page` (stored in that page's folder). Access via `$page->images()`, `$page->documents()`, `$page->videos()`, `$page->files()`, or `$page->file('name.jpg')` for a single file — same methods exist on `$site`.

## Rendering images

```php
<?php foreach ($page->images() as $file): ?>
  <img src="<?= $file->url() ?>">
<?php endforeach ?>
```

**Project rule (AGENTS.md §4):** never output `$file->url()` directly for a large source image — always go through resize/thumbnail helpers (`resize-images-on-the-fly.md`... see below) to serve an appropriately sized image, and set a focus point for cropped images rather than letting Kirby guess.

## File meta data

A file can have its own `.txt` metadata file (`photo.jpg` → `photo.jpg.txt`) with the same field structure as page content — title, caption, alt text, custom fields. This is created/deleted automatically when uploading/removing via the Panel; if you delete a file manually from disk, delete its `.txt` too or Kirby's blueprint lookup breaks.

## Sub-pages: image thumbnails & resizing

Kirby generates thumbnails on the fly via `$file->resize()`, `$file->crop()`, `srcset()` — this is the mechanism behind AGENTS.md's "never upload raw, always resize" rule. Worth reading in full before implementing any image-heavy template.
→ https://getkirby.com/docs/guide/files/resize-images-on-the-fly

## Sub-pages: Files in the Panel & Resources
→ Files in the Panel: https://getkirby.com/docs/guide/files/files-in-the-panel
→ Resources (files outside `/content`, handled as Assets): https://getkirby.com/docs/guide/files/resource

→ Main page: https://getkirby.com/docs/guide/files
