# Skills for Engineering

Agent skills for engineering.

This repo holds three independent bundles. Install whichever a project needs —
they don't depend on each other.

| Bundle | Skills | What it is |
|---|---|---|
| `astack` | 12 | Engineering system: 8 playbooks + 11 principles, entry point `/astack-mode` |
| `pstack` | 50 | Larger principle and workflow set |
| `kirby-cms` | 1 | Kirby CMS 5 domain reference |

## 1. Installation

Name the bundle as a path segment. That installs every skill in it, and nothing
from the other bundles.

Install `astack` (all 12 skills) for `claude-code`:

```
npx skills@latest add baalej/skills/astack --agent claude-code --yes
```

Install `kirby-cms` for `claude-code`, `cursor` and `codex`:

```
npx skills@latest add baalej/skills/kirby-cms --agent claude-code cursor codex --yes
```

Install both — run the two commands; they don't interfere.

### Installing one skill from a bundle

Add `--skill` with the skill's exact name. Note `astack`'s entry point is named
`astack-mode`, not `astack`:

```
npx skills@latest add baalej/skills/astack --skill astack-mode --agent claude-code --yes
```

The playbooks ship inside `astack-mode`, but the 11 principle skills do not —
omit `--skill` to get the complete system.

### Listing what's in a bundle

```
npx skills@latest add baalej/skills/astack --list
```

> Omitting the bundle segment (`add baalej/skills`) only finds `kirby-cms` —
> the installer stops at the first directory depth that yields results, and the
> other bundles nest one level deeper. Add `--full-depth` to scan everything.

## 2. Update

Update all skills inside a project:

```
npx skills@latest update
```

Update a single skill:

```
npx skills@latest update kirby-cms
```
