<!--
source: https://getkirby.com/docs/guide/languages
kirby_version: 5
last_verified: 2026-09-11 (based on stable, long-established Kirby feature — verify against live docs if behavior seems off)
-->

# Multi-language

Enabled with `'languages' => true` in `config.php`; each language is a `.php` file in `site/languages/` defining its code, name, and URL locale. Once enabled, content files become `page.en.txt`, `page.de.txt` per language, and most field/page methods accept an optional language code argument.

**Project rule (AGENTS.md §2.1):** confirm with the project brief before enabling multi-language — it's not a default for this template. Even on a confirmed single-language project, still use `t('key')` for UI strings (button labels, "read more", form labels) so the project doesn't require a rewrite if a language is added later. Content fields don't need this — only fixed UI text.

## Sub-pages
- Translating your content → https://getkirby.com/docs/guide/languages/translating-content
- Translating URLs (per-language slugs) → https://getkirby.com/docs/guide/languages/translating-urls
- Custom language variables (the `t()` strings) → https://getkirby.com/docs/guide/languages/custom-language-variables
- Switching languages in the frontend (language switcher UI) → https://getkirby.com/docs/guide/languages/switching-languages
- Supporting RTL languages → https://getkirby.com/docs/guide/languages/supporting-RTL-languages
