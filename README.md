# Skills for Engineering

Agent skills for engineering.

This repo holds two independent bundles. Install whichever a project needs —
they don't depend on each other.

| Bundle | Skills | What it is |
|---|---|---|
| `astack` | 18 | Engineering system: 10 task playbooks + a fallback + a shared Handoff + 16 principles + 8 depth skills, entry point `/astack-mode` |
| `kirby-cms` | 1 | Kirby CMS 5 domain reference |

## 1. Installation

Name the bundle as a path segment. That installs every skill in it, and nothing
from the other bundles.

Install `astack` (all 25 skills) for `claude-code`:

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

The playbooks ship inside `astack-mode`, but the 16 principle skills do not —
omit `--skill` to get the complete system.

### Listing what's in a bundle

```
npx skills@latest add baalej/skills/astack --list
```

> Omitting the bundle segment (`add baalej/skills`) only finds `kirby-cms` —
> the installer stops at the first directory depth that yields results, and
> `astack` nests one level deeper. Add `--full-depth` to scan everything.

## 2. Update

Update all skills inside a project:

```
npx skills@latest update
```

Update a single skill:

```
npx skills@latest update kirby-cms
```
