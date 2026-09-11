<!--
source: https://getkirby.com/docs/guide/content (and sibling pages)
kirby_version: 5
last_verified: 2026-09-11
-->

# Managing content

How content is stored and structured in Kirby's flat-file system.

## The content model

Kirby is flat-file: every page is a folder under `content/`, and each folder maps 1:1 to a URL (`content/blog` → `/blog`). A page's own data lives in a `.txt` file inside that folder (the field-separator format, `----` between fields). Content can also come from the Panel UI, direct file editing, or programmatically via the API — all three work simultaneously.

**Performance note for large sub-trees:** if a page will have hundreds/thousands of children (e.g. blog posts), add a nesting layer (e.g. by year) to keep Kirby from traversing a huge flat folder. Don't do this pre-emptively for small content sets — premature optimization here has a real maintenance cost.

→ https://getkirby.com/docs/guide/content · creating pages: https://getkirby.com/docs/guide/content/creating-pages

## Fields

Fields are what break a page's content into structured pieces instead of one blob of text — see `panel-blueprints.md` for how fields are defined in blueprints; this page is about the field *values* and content-file mechanics.

→ https://getkirby.com/docs/guide/content/fields

## Publishing workflow

Pages have three states: **draft** (only visible to logged-in users), **listed**, and **unlisted** (both accessible via URL once published, difference is whether they appear in navigation/`children()->listed()`). Use these instead of inventing a custom "status" field for basic draft/published workflows.

→ https://getkirby.com/docs/guide/content/publishing-workflow

## Text formatting (Kirbytext)

Content fields use Markdown or Kirby's extended flavor, **Kirbytext**, which adds Kirbytags (`(image: photo.jpg)`, `(link: page-slug: text: Read more)`, etc.) for embedding files/links without raw HTML. Render with `->kirbytext()` on a field, not by hand-writing HTML in content files.

**Project rule:** since editors write in Kirbytext, don't design blueprints that force HTML into a plain textarea — use `type: textarea` with Kirbytext rendering, or `type: blocks` for structured layout (see `page-builder.md`).

→ https://getkirby.com/docs/guide/content/text-formatting
