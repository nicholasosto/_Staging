# Nx Agents Guide

This document outlines how Codex should interact with the Nx toolchain for the **Soul Steel** project.
It complements `AGENTS.md` with build and automation details.

## 1 • Directory Overview

```
src/                # game source split by client/server/shared
  client/
  server/
  shared/

tools/              # Nx project with command targets
```

The Nx tasks are defined in `tools/project.json` and `tools/game.json`. Each target
executes a command via `nx:run-commands`.

## 2 • Common Nx Commands

| Purpose        | Command                         | Notes                       |
| -------------- | ------------------------------- | --------------------------- |
| Build game     | `nx run tools:game`            | Compiles TS to `out/`       |
| Lint files     | `nx run tools:lint`            | Uses Biome                  |
| Format files   | `nx run tools:format`          | Writes formatted files      |
| Hello example  | `nx run tools:hello`           | Prints a greeting           |
| Generate script| `nx run tools:generate-script` | Creates `generated-script.js` in `tools/`

Run commands with `npx` if Nx is not installed globally:

```bash
npx nx run tools:game
```

## 3 • Caching & Tips

* Nx stores build cache in `.nx/cache`. Repeated commands are faster.
* Tasks output to `out/` or `tools/` as listed in each target.
* Keep `tools/project.json` updated when adding new scripts.

## 4 • Maintenance

Update this guide when Nx targets or directory layout changes so Codex always runs the correct commands.

