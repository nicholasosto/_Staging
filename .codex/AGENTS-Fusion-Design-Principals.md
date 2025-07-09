# Fusion UI Atomic Design Principles

## 1  | Atoms — the indivisible building blocks

| What it is                                                                                    | Guidelines                                                                                                                          | Fusion specifics                                                                                                                                                                                    | Typical examples                                                                          |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Small, foundational UI primitives** – a single `ImageButton`, `TextLabel`, `UIStroke`, etc. | *One* purpose only.<br> No business logic.<br> Receives **all** styling through props/tokens (never hard-code colors, fonts, etc.). | Expose **every** tweakable property as a typed prop so higher layers can theme it.<br> Create internal state only when the control literally can’t work without it (e.g. a `Value` tracking hover). | Frame / Panel, Icon, GameButton core, ProgressBar core, Tooltip bubble, UICorner variants |

### **Design principles - Atom**

* *Purity & predictability* – render the same output for the same props.
* *Flat cost* – avoid `RunService` or heavyweight observers inside atoms.
* *Composable* – atoms must **not** reach into global state; they’re Lego bricks.

---

## 2  | Molecules — simple compounds with a clear role

| What it is                                                        | Guidelines                                                                                                                                                        | Fusion specifics                                                                                         | Typical examples                                                         |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Several atoms working in concert** to fulfill a single UI role. | Bundle interaction logic that one atom alone can’t express (e.g. button + badge + icon).<br> Still *stateless* in terms of business data; accept state via props. | Can create derived `Computed` values from incoming state.<br> May forward events (`OnActivated`) upward. | LabeledTextInput, InventorySlot, CooldownButton, StatusRowItem, RingSlot |

### **Design principles - Molecule**

* *Encapsulation* – hide internal atoms; expose a minimal API (`Props & events`).
* *Theming via injection* – pass token tables (colors, fonts) to atoms rather than re-importing constants.
* *Stable layout contracts* – when a molecule resizes, it does so predictably so organisms can flow around it.

---

## 3  | Organisms — self-contained UI sections

| What it is                                                                                                    | Guidelines                                                                                                                                              | Fusion specifics                                                                                                                                          | Typical examples                                                          |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Complex, reusable sections** composed of many molecules/atoms that together express a distinct piece of UI. | Owns local UI state (*open/closed*, *selected tab*).<br> Knows about domain DTOs (items, abilities) but delegates data mutations upward or to services. | Safe place for `Value` state, `OnChange`, and *light* `RunService` hooks.<br> Can subscribe to profile slices (`useSelector`-style) or RBXTS/Net remotes. | InventoryPanel, EquipmentPanel, ActionBar, CharacterStatsCard, ForgeModal |

### **Design principles - Organism**

* *Mediator* – orchestrates child components and bubbles up high-level events.
* *Performance* – memoise heavy computations with `Computed` and keep `ForPairs` keyed so lists recycle instances.
* *Isolation* – organisms should still be portable; avoid singleton dependencies.

---

### 4  | Templates & Pages (sometimes called *Scenes*)

Once organisms are laid out, **templates** arrange them into a screen or HUD variation (e.g. *Main HUD*, *Forge Screen*). A **page** typically:

* Imports NO Fusion primitives directly – only organisms & templates.
* Owns navigation logic (animations between scenes).
* Talks to high-level services (state slices, Net remotes) and passes data down.

---

## Cross-cutting best practices

1. **Single-direction data flow**
   Parent ⇒ Child only. Use event callbacks to bubble actions up.
2. **Strict typing** everywhere (`interface XXXProps`).
3. **Theme & token system**
   *Atoms* consume tokens, *molecules* pass them, *organisms* choose which palette.
4. **Hydration**
   *Atoms* never call services; *organisms* may run a hydration helper that injects live values after mount (e.g. current HP). Keep that helper in a dedicated `/Fusion/Hydration` folder for clarity.
5. **Folder structure** (example)

   ```txt
   /src/Client/UI
     ├─ Atoms/
     ├─ Molecules/
     ├─ Organisms/
     ├─ Templates/
     ├─ Pages/
     └─ Hydration/   ← hooks & adapters
   ```

6. **Naming**
   *Atom*: **GameButton.ts**
   *Molecule*: **CooldownButton.ts**
   *Organism*: **ActionBar.ts**
   Avoid suffixing with *Atom*/*Molecule* in filenames; keep it in TS-doc headers.

---

### Quick decision checklist

| Question                                                | If **yes** → | If **no** →                                            |
| ------------------------------------------------------- | ------------ | ------------------------------------------------------ |
| “Does this need only one UI object?”                    | **Atom**     | Next question                                          |
| “Is it just a couple atoms bundled with trivial state?” | **Molecule** | Next question                                          |
| “Does it present a self-contained functional section?”  | **Organism** | Maybe it’s a Template/Page or you should split further |

---

Keep these heuristics nearby and you’ll stay consistent across the codebase. Let me know anytime you’d like deeper dives (e.g. performance patterns for ForPairs) or a code walk-through of a specific component.
