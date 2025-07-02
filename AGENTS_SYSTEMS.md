# Soul Steel — **AGENTS** Guide for Game Systems

> *Teach Codex and fellow contributors the mental model that powers Soul Steel.*

---

## 0 · Purpose

This document acts as an **AGENTS.md** reference. It explains every core system, shows the canonical file layout, and lists the rules Codex should enforce when generating or refactoring code. The goal is to keep design patterns consistent, minimise boilerplate, and accelerate emergent‑behaviour experimentation.

---

## 1 · Global Conventions

| Category                   | Guideline                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Language**               | Strict **TypeScript** (`rojo + roblox-ts@latest`, `@rbxts/fusion` v4, ESModule syntax)                                                                                   |
| **Layers**                 | `Shared/` → pure data & enums · `Server/` → State & Services · `Client/` → UI & Presentation                                                                             |
| **Atomic UI**              | Atoms ▸ Molecules ▸ Organisms ▸ Screens ▸ Overlays                                                                                                                       |
| **DataDefinition Pattern** | Every definitional module exports `KEYS`, `KeyType`, `KeyMeta`, and `KeyMetaMap`. Keys are **PascalCase string literals**. Meta objects are plain data ‑ *no functions*. |
| **UUIDs**                  | All persistent instances (gems, items) carry a snowflake `uuid` (via `HttpService.GenerateGUID(false)`)                                                                  |
| **Networking**             | Use `@rbxts/net` with `NameOf<>()` helpers.  All client‑facing events must be confirmed via a matching server RPC.                                                       |

### 1.1 · Folder Skeleton

```
├── game/
│   ├── Shared/
│   │   ├── definitions/           # attributeKeys.ts, gemTypes.ts …
│   │   └── dtos/                 # typed data‑transfer objects
│   ├── Server/
│   │   ├── services/             # profileService, manifestationFactory …
│   │   └── ecs/                  # Matter systems
│   └── Client/
│       ├── ui/
│       │   ├── atoms/
│       │   ├── molecules/
│       │   └── organisms/
│       └── screens/
└── docs/AGENTS_SoulSteel_GameSystems.md
```

---

## 2 · System Catalogue

For every system we outline **Intent → Key Data → Runtime Flow → AI Rules**.

### 2.1 · Attribute System

* **Intent**: Represent player & NPC stats (health, mana, strength …).
* **Key Data**: `AttributeKey`, `AttributeMeta` (min, max, UI style).
* **Runtime Flow**:

  1. `Server.AttributeService` owns authoritative values.
  2. Emits `AttributeChanged` via `@rbxts/net`.
  3. `Client.PlayerState` holds reactive `Value`s that drive UI bars.
* **AI Rules**:

  * New attribute ➜ update `attributeKeys.ts` *and* `AttributeMetaMap`.
  * Ensure corresponding colours exist in `theme/tokens/colors.ts`.

### 2.2 · Resource System

Generalised wrapper for consumables (stamina, rage, ammo …). Shares pattern with attributes but adds **regen** and **drain** policies.

### 2.3 · Inventory & Equipment

* **Models**: `InventoryItemDTO`, `EquipmentSlotKey`, `EquipmentMeta`.
* **Persistence**: `ProfileService` stores UUID lists; the `ItemStore` table keeps heavy metadata.
* **UI**: `InventoryGrid` (organism) + `InventorySlot` (atom).
* **AI Rules**:

  * When generating an item, **never** embed functions inside DTOs.
  * Trigger `EquipmentChanged` event after every equip/unequip.

### 2.4 · Gem & Soul Forge System

* **Sub‑gem types**: **Form**, **Ability**, **Bonus**.
* **ManifestationGemFactory** merges three sub‑gems into a single gem object tagged with its own UUID.
* **Forge UI**: `GemForgeScreen` orchestrates drag‑and‑drop from gem inventory to forge slots.
* **AI Rules**:

  * Validate capacity before creation (`sum(subGem.capacity) ≤ ForgeSlot.max`).
  * On new rarity tier, generate 5 placeholder sprites in `assets/gems/`.

### 2.5 · NPC Templates & Loot Tables

* **TemplateKey** pattern mirrors player attribute definition.
* **LootTableMeta** includes `weight`, `minRoll`, `maxRoll` and drop callbacks.
* **AI Rules**:

  * Loot tables must reference **ItemKey** strings, never direct asset IDs.
  * Provide helper `createNpcDisplayName()` that randomises first name, last name, and moniker.

### 2.6 · Domain & Zone Power

* **Domains**: Blood, Decay ...
* **ZoneService** aggregates structure scores and emits `DomainPowerChanged`.

### 2.7 · Talent Tree & Classes

* **Starter Class**: `Unborn` with melee/ranged/magic basics.
* **Tree** stored as directed acyclic graph of `TalentNodeDTO`.

### 2.8 · Cooldown & Ability Casting

Reusable `CooldownTimer(amount)` that wraps `RunService.Heartbeat`.

### 2.9 · UI Architecture Guidelines

* Keep layout purely in **Fusion**; never set positions in imperative code.
* Use `ThemeState` for colours, fonts, and gradients.

---

## 3 · Codex Agent Tasks

> *Codex, follow these verbs*

1. **GENERATE** new definition modules using the DataDefinition scaffold.
2. **UPDATE** dependent meta maps when keys are added/removed.
3. **SYNTHESISE** TypeScript wrappers so that UI components accept only typed keys.
4. **REFRACTOR**: if duplication is ≥ 3 identical lines across atoms, consolidate into a shared util.
5. **VALIDATE** that all public API calls are covered by an appropriate `@rbxts/net` remote.
6. **DOCUMENT**: On every commit touching data definitions, regenerate `/docs/autogen/definitions.md`.

---

## 4 · Example Snippets

### 4.1 Attribute Definition Template

```ts
// Shared/definitions/attributeKeys.ts
export const AttributeKeys = [
  "Health", "Mana", "Stamina",
] as const;
export type AttributeKey = typeof AttributeKeys[number];

export interface AttributeMeta {
  max: number;
  displayName: string;
  colour: Color3;
}
export const AttributeMetaMap: Record<AttributeKey, AttributeMeta> = {
  Health: { max: 100, displayName: "HP", colour: Color3.fromRGB(255,0,0) },
  Mana:   { max: 100, displayName: "MP", colour: Color3.fromRGB(0,0,255) },
  Stamina:{ max: 100, displayName: "SP", colour: Color3.fromRGB(0,255,0) },
};
```

### 4.2 Codex Enforcement Test

```ts
// tests/attributeKeys.spec.ts
import { AttributeMetaMap } from "shared/definitions/attributeKeys";
import { expect } from "@rbxts/testez";
expect(Object.keys(AttributeMetaMap).size()).to.equal(AttributeKeys.size(),
  "Every key must have meta");
```

---

## 5 · Roadmap / TODO

* [ ] **Combat ECS Migration** — move existing combat loop into Matter.
* [ ] **Dynamic Zones** — let zone borders shift based on Domain Power deltas.
* [ ] **Narrative Events** — YAML‑driven story sequences consumed by `StoryService`.

---

## 6 · Attribution & Licensing

© 2025 Nicholas Osto (Trembus). MIT for code, CC‑BY‑SA 4.0 for documents.  All third‑party assets remain property of their respective owners.

---
