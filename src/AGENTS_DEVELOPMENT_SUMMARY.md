# Development Summary

The table below lists core modules grouped by network layer and their current stability.

| Layer   | Module                                   | Status             | Notes |
|--------|------------------------------------------|--------------------|-------|
|Shared|`shared/network`|Rock Solid|Typed event definitions|
|Shared|`shared/data/attributes.ts`|Rock Solid|Attribute metadata and helpers|
|Shared|`shared/data/Gem.ts`|Under Construction|Basic types only|
|Shared|`shared/data/rarity.ts`|Stub|Placeholder rarity enums|
|Shared|`shared/assets`|Usable|Image asset constants|
|Shared|`shared/states`|Usable|Signal-based shared state|
|Shared|`theme`|Usable|Fusion theme store|
|Shared|`constants`|Rock Solid|Sizes and asset ids|
|Client|`client/main.client.ts`|Usable|Entry point and UI bootstrap|
|Client|`client/stylesheet.client.ts`|Under Construction|StyleSheet prototype|
|Client|`client/ui/atoms`|Usable|Core UI atoms (buttons, panels)|
|Client|`client/ui/style`|Rock Solid|Tokenized layout and colors|
|Client|`client/ui/atoms/Screen/GameScreen.ts`|Usable|Base screen wrapper|
|Client|`client/ui/molecules/CountdownTimer.ts`|Usable|Displays battle countdown|
|Client|`client/ui/screens`|Under Construction|Gem forge and HUD screens|
|Server|`server/main.server.ts`|Under Construction|Joins players and loads profiles|
|Server|`server/network/network.server.ts`|Usable|Server network handlers|
|Server|`server/services/ProfileService.ts`|Under Construction|Loads player profiles|
|Server|`server/services/BattleRoomService.ts`|Stub|Matchmaking and teleport skeleton|
|Server|`server/entity/Manifestation.ts`|Stub|Placeholder creation logic|

Keep this summary updated whenever modules are added or changed.
