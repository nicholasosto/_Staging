# Development Summary

The table below lists core modules grouped by network layer and their current stability.

| Layer   | Module                                   | Status             | Notes |
|--------|------------------------------------------|--------------------|-------|
|Shared|`shared/network`|Rock Solid|Typed event definitions|
|Shared|`shared/data/attributes.ts`|Rock Solid|Attribute metadata and helpers|
|Shared|`shared/data/Gem.ts`|Under Construction|Basic types only|
|Shared|`shared/data/rarity.ts`|Stub|Placeholder rarity enums|
|Shared|`shared/assets`|Usable|Image asset constants|
|Client|`client/main.client.ts`|Usable|Entry point and UI bootstrap|
|Client|`client/stylesheet.client.ts`|Under Construction|StyleSheet prototype|
|Client|`client/ui/atoms`|Usable|Core UI atoms (buttons, panels)|
|Client|`client/ui/style`|Rock Solid|Tokenized layout and colors|
|Server|`server/main.server.ts`|Under Construction|Joins players and loads profiles|
|Server|`server/network/network.server.ts`|Usable|Server network handlers|
|Server|`server/services/ProfileService.ts`|Under Construction|Loads player profiles|
|Server|`server/entity/Manifestation.ts`|Stub|Placeholder creation logic|

Keep this summary updated whenever modules are added or changed.
