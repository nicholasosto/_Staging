/// <reference types="@rbxts/types" />

/**
 * @file        NetDefinitions.ts
 * @module      NetDefinitions
 * @layer       Shared
 * @description Remote route definitions for client/server communication.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-06 by Codex
 */

// @generated-scaffold

import Net from "@rbxts/net";
import type { AbilityKey, AttributeKey, ProfileDataKey, SettingKey, ResourceKey, NPCKey } from "shared/definitions";

export enum ServerRoutes {
	AbilityActivate = "Ability/Activate",
	AttributeIncrease = "Attributes/Increase",
	AddExperience = "Progression/AddExperience",
	CreateRoom = "BattleRoom/Create",
	JoinRoom = "BattleRoom/Join",
	UpdateSetting = "Settings/Update",
	AddGem = "Forge/AddGem",
	GetData = "Data/Get",
	SpawnNPC = "Admin/SpawnNPC",
}

export enum ClientRoutes {
	ResourceUpdated = "Resource/Update",
	AbilitiesUpdated = "Abilities/Update",
	AttributesUpdated = "Attributes/Update",
	PlayerSettingsUpdated = "Settings/Updated",
	ProgressionUpdated = "Progression/Update",
	RoomCountdown = "BattleRoom/Countdown",
}

export const NetDefinitions = Net.Definitions.Create({
	[ServerRoutes.AbilityActivate]: Net.Definitions.ClientToServerEvent<[AbilityKey]>(),
	[ServerRoutes.AttributeIncrease]: Net.Definitions.ClientToServerEvent<[AttributeKey, number]>(),
	[ServerRoutes.AddExperience]: Net.Definitions.ClientToServerEvent<[number]>(),
	[ServerRoutes.CreateRoom]: Net.Definitions.ClientToServerEvent<[]>(),
	[ServerRoutes.JoinRoom]: Net.Definitions.ClientToServerEvent<[string]>(),
	[ServerRoutes.UpdateSetting]: Net.Definitions.ClientToServerEvent<[SettingKey, boolean | string]>(),
	[ServerRoutes.AddGem]: Net.Definitions.ClientToServerEvent<[string]>(),
	[ServerRoutes.GetData]: Net.Definitions.ServerFunction<(key: ProfileDataKey) => unknown>(),
	[ServerRoutes.SpawnNPC]: Net.Definitions.ClientToServerEvent<[NPCKey]>(),

	[ClientRoutes.ResourceUpdated]: Net.Definitions.ServerToClientEvent<[ResourceKey, number, number]>(),
	[ClientRoutes.AbilitiesUpdated]: Net.Definitions.ServerToClientEvent<[AbilityKey[]]>(),
	[ClientRoutes.AttributesUpdated]: Net.Definitions.ServerToClientEvent<[unknown]>(),
	[ClientRoutes.PlayerSettingsUpdated]: Net.Definitions.ServerToClientEvent<[unknown]>(),
	[ClientRoutes.ProgressionUpdated]: Net.Definitions.ServerToClientEvent<[unknown]>(),
	[ClientRoutes.RoomCountdown]: Net.Definitions.ServerToClientEvent<[string, number]>(),
});

export default NetDefinitions;
