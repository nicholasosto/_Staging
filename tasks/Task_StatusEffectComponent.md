## 🍿 Feature / Fix Title

**Create Collapsible Effects Panel with Dynamic Badge**

---

### 1 • Context

Players need an at‑a‑glance indicator of how many status effects (buffs, debuffs, auras, etc.) are currently applied to them, while still keeping the UI uncluttered. A collapsible panel that can be toggled open to reveal detailed effect cards—and closed to show only a compact badge—strikes a good balance between information density and screen real‑estate. The badge count will be sourced from the existing `PlayerEffects` state slice, keeping the component fully reactive to game state changes.&#x20;

### 2 • Goal

When Codex is finished, developers can drop a typed **`CollapsibleEffectsPanel`** Fusion component into any screen. It must:

* Display a toggle button with a badge that always shows the live count of effects in `PlayerEffects` (via ForPairs/ForKeys reactivity).
* Animate open/close (slide‑down or scale‑Y) in ≤ 150 ms.
* Render individual effect “cards” (icon + name + remaining time) when expanded.
* Expose an imperative `toggle()` function and an `isOpen()` getter for optional programmatic control.

### 3 • Deliverables

| ID | Item                              | Format           | Notes                           |
| -- | --------------------------------- | ---------------- | ------------------------------- |
| D1 | `CollapsibleEffectsPanel.tsx`     | Fusion component | Strict mode, no additional deps |
| D2 | `CollapsibleEffectsPanel.spec.ts` | Jest tests       | Badge count, open/close logic   |
| D3 | `effectsPanel.stories.tsx`        | Storybook        | Interactive demo                |
| D4 | `README_EffectsPanel.md`          | Markdown         | Usage + props matrix            |

### 4 • Acceptance Criteria (AC)

1. `npm run build` passes with `--strict` ✅
2. Unit tests & Storybook CI pass ✅
3. ESLint shows 0 errors / warnings ✅
4. Public API matches **Interface** section exactly ✅
5. No TODO / console.log in diff ✅
6. Badge count updates ≤ 100 ms after `PlayerEffects` mutation ✅
7. Panel height animates smoothly at ≥ 60 fps on target device ✅
8. Accessible: toggle button has ARIA `expanded` and is keyboard‑navigable ✅

### 5 • Interface (source of truth)

```ts
// CollapsibleEffectsPanel.tsx
export interface EffectsPanelProps {
  /** Optional initial open state (default false) */
  defaultOpen?: boolean;
  /** Optional width override (defaults to 250px) */
  width?: UDim; // Fusion UDim
}

/**
 * Collapsible panel that shows current status effects.
 *
 * Usage:
 * <CollapsibleEffectsPanel defaultOpen={true} />
 */
export function CollapsibleEffectsPanel(props?: EffectsPanelProps): Frame & {
  /** Returns true if panel is expanded */
  isOpen(): boolean;
  /** Toggles between expanded / collapsed states */
  toggle(): void;
};
```

> **State Source**
> `PlayerEffects` slice must expose a selector `selectEffectList(playerId): Effect[]`.
> The badge text is simply `#effects.length`.
> Panel body uses `ForPairs` to render each effect card, keyed by `effect.id`.

---

### 🛠 Implementation Notes

* **Atomic Design**

  * **Atom** `EffectBadge` – styled text label with count
  * **Molecule** `EffectCard` – icon, name, countdown bar
  * **Organism** `CollapsibleEffectsPanel` – wraps badge + card list
* **Animation**: Fusion `TweenService` on `UISizeConstraint` height or a `CanvasGroup` transparency fade.
* **Styling**: Follow SoulSteel design system tokens; badge uses alert color when `count > 0`.
* **Testing**: Mock `PlayerEffects` store; verify badge updates when slice mutates.
* **Performance**: Memoize effect card list; reuse instances where possible to avoid GC churn.
