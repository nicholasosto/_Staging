## 🍿 Feature / Fix Title

**Enhance Ability UI & Networking**

---

### 1 • Context

> The current `AbilityButton` and `AbilityBar` components lack unified styling, smooth cooldown animation, and network‑safe state updates. Refactoring with clearer interfaces and strict typing will ease future expansion (e.g., passive abilities) and prevent desync bugs between client and server.

### 2 • Goal

* **What should exist when Codex is done?**
  A fully‑typed Ability UI suite that

  1. Renders ability icons, hotkeys, and cooldown overlay at 60 FPS.
  2. Subscribes to a dedicated Redux‑like state slice (`AbilitySlice`) and rbxts‑net remotes (`AbilityBarUpdated`, `CastRequest`).
  3. Exposes a `UseAbility` hook for other UI atoms.
  4. All components support ThemeState and are styled consistently with the rest of the UI.
  5. Cooldown overlays animate smoothly with a 0.5 s duration.

### 3 • Deliverables

| ID | Item                 | Format           | Notes                                       |
| -- | -------------------- | ---------------- | ------------------------------------------- |
| D1 | `AbilityButton.ts`  | Fusion component | Atom; per‑ability icon + cooldown overlay   |
| D2 | `AbilityBar.ts`     | Fusion component | Organism; horizontal list, supports 8 slots |
| D3 | `PlayerState.ts`    | State slice      | Computed selectors + actions                |
| D4 | `Definitions.ts`  | rbxts‑net module | `GetData('Abilities')`, `SetData('Abilities')` |
| D5 | `abilityBar.spec.ts` | Jest tests       | Mount, cooldown, hotkey update              |
| D6 | Storybook stories    | Docs / `.tsx`    | Interactive docs for designers              |

### 4 • Acceptance Criteria (AC)

1. Builds with `npm run build` ☐
2. All Jest tests pass (`npm test`) ☐
3. Matches style guide (`eslint --fix`) ☐
4. AbilityBar re‑renders within ≤ 2 ms diff when a slot updates ☐
5. No TODOs / console.logs in final diff ☐
