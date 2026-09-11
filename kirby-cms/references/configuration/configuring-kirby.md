<!--
source: https://getkirby.com/docs/guide/configuration
kirby_version: 5
last_verified: 2026-09-11
-->

# Configuring Kirby

All site-wide config lives in `site/config/config.php`, returning a single array — only one `return` statement per file.

```php
<?php
return [
  'debug' => true,
  'someOtherSetting' => 'something',
];
```

`$kirby`/`kirby()` is **not** available inside `config.php` itself (Kirby isn't fully booted yet when it's read) — use the `ready` option for anything that needs to be computed dynamically.

## Plugin options

Set as a single dotted-string key, not a nested array:

```php
// Correct
return ['author.pluginname' => ['option' => 'value']];
// Wrong — will NOT work
return ['author' => ['pluginname' => ['option' => 'value']]];
```

## Splitting config across files

For readability, `require` sub-files instead of one giant array:

```php
return [
  'debug' => true,
  'hooks' => require_once 'hooks.php',
];
```

## Multi-environment config

Kirby auto-loads a host-specific override file if one exists, named after the domain:
`config.localhost.php`, `config.staging.example.com.php`, `config.example.com.php`. The base `config.php` always applies; host-specific files only override what they explicitly set.

`config.cli.php` overrides for CLI context (Kirby CLI, custom scripts). `env.php` overrides everything, from any source — use it for deployment-injected values (API keys, per-server URLs) that shouldn't be committed.

**Project rule:** never hardcode environment-specific values (API keys, staging URLs) directly in `config.php` if the project is deployed to more than one environment — use `env.php` for those, and keep `env.php` out of version control.

## Key options worth knowing exist

`cache` (see `caching.md`), `routes` (see `routes.md`), `hooks` (event system — page.create, file.delete, etc.), `languages`, `panel` (custom CSS/JS, disable panel), `url` (fixed base URL, needed behind reverse proxies), `thumbs` (default resize quality/format). Full list: https://getkirby.com/docs/guide/configuration#using-options__all-configuration-options

→ https://getkirby.com/docs/guide/configuration
