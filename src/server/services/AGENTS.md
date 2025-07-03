# Services Overview

This folder contains server-side services responsible for game state management and gameplay systems.
Below is a quick reference of each service and the main mutations they expose.

## Services

### DataService
Handles player profile loading via ProfileService. Provides `GetProfile(player)` to access profile data.

### ManifestationForgeService
Validates and constructs manifestation DTOs. `ForgeManifestation(player, formId, abilityId, bonusId)` creates a new manifestation entry in the player's profile.

### BattleRoomService
Manages temporary battle rooms and teleports players when the countdown completes. Key mutations: `CreateRoom(owner)`, `JoinRoom(player, roomId)`, `SetActiveGem(player, roomId, gemId)`.

### SettingsService
Stores per-player settings in memory. `GetSettings(player)` returns a settings table and `SetSettings(player, key, value)` updates a setting.

### NPCService
Spawns NPC instances and removes them. Mutation methods: `Spawn(key, cFrame)` and `Remove(npc)`.

### AbilityService
Handles activation of player abilities and manages cooldown timers. Primary mutation: `Activate(player, abilityKey)`.

### StatusEffectService
Applies periodic status effects to players. Mutations include `AddEffect(player, effectKey)`, `RemoveEffect(player, effectKey)`, and `ClearEffects(player)`.

### ResourcesService
Tracks player health, mana and stamina. Mutations: `ModifyResource(player, key, delta)` and recalculation via `Recalculate(player)`.
