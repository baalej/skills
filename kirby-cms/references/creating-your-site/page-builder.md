<!--
source: https://getkirby.com/docs/guide/page-builder/using-blocks, /custom-blocks
kirby_version: 5
last_verified: 2026-09-11
-->

# Page builder (blocks)

The `blocks` field type lets editors freely compose page layout from a list of block types (heading, text, image, custom types...). This is Kirby's answer to "flexible content" — see `panel-blueprints.md` §Reusing & AGENTS.md §6 for when to choose blocks vs. structure fields.

## Defining a custom block

Simplest form — inline in the blocks field's `fieldsets`:

```yaml
fields:
  blocks:
    type: blocks
    fieldsets:
      - heading
      - text
      - type: button
        name: Button
        icon: bolt
        fields:
          link: { type: url }
          text: { type: text }
```

**For reuse across blueprints** (the common case in a template), define it globally instead, in `site/blueprints/blocks/button.yml`:

```yaml
# site/blueprints/blocks/button.yml
name: Button
icon: bolt
fields:
  link: { type: url }
  text: { type: text }
```

then reference it by name: `fieldsets: [heading, text, button]`.

## Rendering a custom block

Create a matching snippet at `site/snippets/blocks/button.php`:

```php
<a href="<?= $block->link() ?>" class="btn"><?= $block->text() ?></a>
```

**Project rule (AGENTS.md §2.2 / §3):** this snippet's styles go in `assets/css/blocks/button.css`, with BEM root class `.block-button` (the `block-` prefix, not plain `.button`, to avoid colliding with a same-named snippet component).

## Block UI features worth knowing

Editors can drag-reorder, duplicate, split/merge, and paste-convert content from other documents into blocks — no code needed for any of this, it's built into the field. Useful to know when a client asks "can I reorder these" — the answer is always yes without you touching a blueprint.

## Sub-pages
- Using the blocks field (editor UX) → https://getkirby.com/docs/guide/page-builder/using-blocks
- Customizing core blocks → https://getkirby.com/docs/guide/page-builder/customizing-core-blocks
- Custom block examples → https://getkirby.com/docs/guide/page-builder/block-examples
- Audio block with preview (complex example) → https://getkirby.com/docs/guide/page-builder/complex-custom-block
