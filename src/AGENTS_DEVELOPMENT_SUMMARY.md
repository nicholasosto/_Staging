# Development Summary

The table below lists core modules grouped by network layer and their current stability.

| Layer   | Module                                   | Status             | Notes |
|--------|------------------------------------------|--------------------|-------|
|Shared|`shared/network`|Rock Solid|Typed event definitions|
|Shared|`shared/data/AbilityData.ts`|Under Construction|Ability metadata|
|Shared|`shared/data/AttributeData.ts`|Rock Solid|Attribute metadata and helpers|
|Shared|`shared/data/CodonData.ts`|Rock Solid|Genetic codon constants|
|Shared|`shared/data/GemData.ts`|Under Construction|Gem DTOs|
|Shared|`shared/data/ItemData.ts`|Usable|Generic item DTO|
|Shared|`shared/data/PlayerData.ts`|Stub|Player profile template|
|Shared|`shared/data/RarityData.ts`|Rock Solid|Rarity metadata|
|Shared|`shared/data/ResourceData.ts`|Rock Solid|Resource metadata|
|Shared|`shared/data/RigData.ts`|Usable|Rig template references|
|Shared|`shared/assets`|Usable|Image asset constants|
|Shared|`shared/states`|Usable|Signal-based shared state|
|Shared|`theme`|Usable|Fusion theme store|
|Shared|`constants`|Rock Solid|Sizes and asset ids|
|Client|`client/main.client.ts`|Usable|Entry point and UI bootstrap|
|Client|`client/stylesheet.client.ts`|Under Construction|StyleSheet prototype|
|Client|`client/ui/atoms`|Usable|Core UI atoms (buttons, panels)|
|Client|`client/ui/style`|Rock Solid|Tokenized layout and colors|
|Client|`client/ui/atoms/Screen/GameScreen.ts`|Usable|Base screen wrapper|
|Client|`client/ui/atoms/DragDetector/DragDetector.ts`|Usable|Drag detector atom|
|Client|`client/ui/atoms/Button/UIButton.ts`|Usable|Unified button primitive|
|Client|`client/ui/atoms/Button/DraggableButton.ts`|Usable|Wrapper preset for draggable buttons|
|Client|`client/ui/molecules/CountdownTimer.ts`|Usable|Displays battle countdown|
|Client|`client/ui/molecules/GameWindow.ts`|Usable|Panel window with title bar|
|Client|`client/ui/molecules/TitleBar.ts`|Usable|Window title bar component|
|Client|`client/ui/molecules/SettingListItem.ts`|Usable|Displays and edits a single setting|
|Client|`client/states/SettingsState.ts`|Usable|Reactive settings container|
|Client|`client/network/CallServer.ts`|Usable|Client RPC helpers|
|Client|`client/network/listener.client.ts`|Usable|Receives server events|
|Client|`client/ui/screens`|Under Construction|Gem forge, character, inventory, shop, settings, teleport and HUD screens|
|Client|`client/ui/screens/DragDropScreen.ts`|Usable|Drag and drop demo|
|Client|`client/ui/screens/CharacterScreen.ts`|Stub|Character info window|
|Client|`client/ui/screens/InventoryScreen.ts`|Stub|Inventory window|
|Client|`client/ui/screens/ShopScreen.ts`|Stub|Item shop window|
|Client|`client/ui/screens/SettingsScreen.ts`|Stub|Settings window|
|Client|`client/ui/screens/TeleportScreen.ts`|Stub|Teleport locations window|
|Server|`server/main.server.ts`|Under Construction|Joins players and loads profiles|
|Server|`server/network/network.server.ts`|Usable|Server network handlers|
|Server|`server/services/DataService.ts`|Usable|Loads player profiles|
|Server|`server/services/ManifestationForgeService.ts`|Under Construction|Creates manifestations|
|Server|`server/services/BattleRoomService.ts`|Usable|Matchmaking and teleport skeleton|
|Server|`server/services/SettingsService.ts`|Usable|Stores player settings|
|Server|`server/entity/Manifestation.ts`|Stub|Placeholder creation logic|
|Server|`server/services/NPCService.ts`|Usable|Spawns NPCs from definitions|
|Server|`server/services/AbilityService.ts`|Under Construction|Handles ability activation and cooldowns|
|Server|`server/services/StatusEffectService.ts`|Under Construction|Refactored to use StatusEffects|
|Server|`server/services/ResourcesService.ts`|Under Construction|Tracks player resource values - bug fix for static call|
|Server|`server/entity/npc/NPC.ts`|Usable|NPC instance with random names|
|Server|`server/entity/player/SoulPlayer.ts`|Usable|Player data container|
|Server|`server/entity/entityResource/EntityResource.ts`|Usable|Drops collectible resource|

Keep this summary updated whenever modules are added or changed.
