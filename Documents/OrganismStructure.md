# Organism Structure & Debugging Pattern

This document outlines a recommended structure for complex organisms in the Soul Steel codebase, particularly those built with Fusion. It also introduces a debugging pattern that allows developers to easily test and debug these organisms without cluttering the production code.

## 1  |  Overview

Organisms in the Soul Steel codebase are complex components that often require multiple sub-components and state
management. To maintain clarity and consistency, we recommend the following structure for each organism:

## 2  |  Annotated example showing **(a)** comment structure & **(b)** a plug-in debug panel

```ts
/// <reference types="@rbxts/types" />

/**
 * @file        ResourceBars.ts                     ◄────── must match filename
 * @module      ResourceBars                        ◄────── public import name
 * @layer       Client/Organisms
 * @description Composite organism that shows the
 *              player's Health, Mana & Stamina.
 *
 * ╭───────────────────────────────────────────────╮
 * │  Soul Steel · Coding Guide                   │
 * │  Fusion v4 · Strict TS · ECS                 │
 * ╰───────────────────────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-06-25 by Luminesa – Comment revamp
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

// -------------- Imports ----------------------------------------------------- //
import Fusion, { New } from "@rbxts/fusion";
import { BaseContainer, ListContainer, GameButton } from "client/atoms";        // absolute alias
import { BarMeter } from "client/molecules";
import { PlayerHealth, PlayerMana, PlayerStamina } from "shared/states/PlayerState";
import { Layout, Padding } from "client/style";
import { GameImages } from "shared/assets";

// -------------- Design-tokens / theme -------------------------------------- //
const COLORS = {
 HEALTH: Color3.fromRGB(255, 0, 0),
 MANA:   Color3.fromRGB(  0, 0, 255),
 STAMINA:Color3.fromRGB(  0,255,  0),
};

// -------------- Organism constants ----------------------------------------- //
const ORG = {                               // small object beats 5 globals
 SIZE:          UDim2.fromOffset(400, 200),
 POSITION:      UDim2.fromScale(0.5, 0.5),
 ANCHOR_POINT:  new Vector2(0.5, 0.5),
 BG_TRANSPARENCY: 0.5,
};

const DEBUG = {
 BUTTON_SIZE: UDim2.fromOffset(50, 50),
 CONTAINER_SIZE: UDim2.fromScale(1, 0.3)),
};

// -------------- Public factory --------------------------------------------- //
/**
 * Creates the ResourceBars HUD organism.
 *
 * @param debug When `true`, spawns a dev-only toolbar that lets you burn 10
 *              points of each resource to test the UI.  
 *              **Tip:** wrap this in an editor-only flag so production
 *              bundles tree-shake the debug code.
 */
export const ResourceBars = (debug = false) => {
 /* ---------- Dev-only controls ----------------------------------------- */
const DebugPanel = debug
  ? ListContainer({
    Name: "ResourceBarsDebug",
    Size: DEBUG.CONTAINER_SIZE,
    Position: UDim2.fromScale(0, 1),
    LayoutOrientation: "horizontal",
    Gap: 5,
    Padding: Padding(2),
    Children: {
     HealthDown:   makeDrainButton(GameImages.Attributes.Vitality,  PlayerHealth.Current),
     ManaDown:     makeDrainButton(GameImages.Attributes.Intelligence, PlayerMana.Current),
     StaminaDown:  makeDrainButton(GameImages.Attributes.Dexterity,  PlayerStamina.Current),
    },
    })
  : undefined; // ← Nothing is created if debug === false

 /* ---------- Resource bar stack ---------------------------------------- */
const Bars = ListContainer({
  Name: "ResourceBarsStack",
  LayoutOrientation: "vertical",
  Gap: 5,
  Children: {
   Health:  makeBar(PlayerHealth,  COLORS.HEALTH),
   Mana:    makeBar(PlayerMana,    COLORS.MANA),
   Stamina: makeBar(PlayerStamina, COLORS.STAMINA),
  },
 });

 /* ---------- Final organism root --------------------------------------- */
 return BaseContainer({
  Name: "ResourceBarsOrganism",
  Size: ORG.SIZE,
  Position: ORG.POSITION,
  AnchorPoint: ORG.ANCHOR_POINT,
  BackgroundTransparency: ORG.BG_TRANSPARENCY,
  DragEnabled: false,                // safer default – opt-in later
  Children: {
   DebugPanel,                    // omitted entirely when undefined
   Bars,
  },
 });
};

// -------------- Local helpers --------------------------------------------- //
function makeBar(state: typeof PlayerHealth, colour: Color3) {
 return BarMeter({
  value: state.Current,
  max:   state.Max,
  color: colour,
  Size:  UDim2.fromScale(1, 0.3),
 });
}

function makeDrainButton(icon: string, resource: Fusion.Value<number>) {
 return GameButton({
  Image: icon,
  Size: DEBUG.BUTTON_SIZE,
  OnClick: () => resource.set(math.max(0, resource.get() - 10)),
 });
}
```

### What the example demonstrates

1. **Header doc-block**
   *Uniform five-line structure* → quickly searchable; includes `@file`, `@module`, `@layer`, and an ASCII banner that matches the rest of the codebase.

2. **Logical sections**
   `// -------------- Imports ------------- //` etc. keep commits tidy and let dev-tools fold sections.

3. **Theme / design-token objects**
   Instead of “magic” RGB values scattered around, colours live in one constant. Same idea for sizes.

4. **Debug pattern**
   *Factory param ➜ decides whether to construct the dev UI at all*. By returning `undefined` when `debug` is `false`, the debug subtree is never touched by Fusion and can be stripped with tree-shaking if you wrap the outer factory in an environment flag:

   ```ts
   const DebugPanel = (__DEV__ && debug) ? … : undefined;
   ```

5. **Helper functions**
   `makeBar` and `makeDrainButton` keep the main factory short and self-documenting.

6. **Inline JSDoc on public API**
   The `@param debug` annotation explains how to use the feature without diving into implementation.

---

### Using this pattern elsewhere

* **Organism-level toggles** – Any complex organism (e.g. minimap, quest tracker) can accept a `debug?: boolean | DebugConfig` parameter and spawn panels that mutate mock state or print signals to the console.
* **Component comments** – Re-use the *Imports → Theme → Constants → Factory → Helpers* skeleton so new team-members instantly know where to look.
