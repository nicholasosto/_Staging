/// <reference types="@rbxts/types" />

/**
 * @file        Definitions.ts
 * @module      NetworkDefinitions
 * @layer       Shared/Network
 * @description Typed network event definitions for the project.
 */

/* =============================================== Imports =============================================== */
import Net from "@rbxts/net";
import {
	AbilityKey,
	AttributeKey,
	SettingKey,
	PlayerSettings,
	ResourceKey,
	NPCKey,
	ProfileDataMap,
	ProfileDataKey,
} from "shared/definitions";

/*
 * Generic helpers ────────────────────────────────────────────────
 *   - K is inferred from the call, e.g. "Stats"
 *   - Net’s “Function” wrapper enforces argument/return parity
 */
type GetDataFn = <K extends ProfileDataKey>(dataKey: K) => Promise<ProfileDataMap[K]>;

/* =============================================== Network Definitions =============================================== */

export const AdminNet = Net.Definitions.Create({
	SPAWN_NPC: Net.Definitions.ClientToServerEvent<[npcId: NPCKey]>(),
	SPAWN_WEAPON: Net.Definitions.ServerAsyncFunction<() => void>(),
});

export const ClientDispatch = Net.Definitions.Create({
	/* --------------------------------------------- Gems ------------------------------------------------- */
	AddGem: Net.Definitions.ClientToServerEvent<[gemId: string]>(),

	/* --------------------------------------------- Battle Room ------------------------------------------------- */
	CreateRoom: Net.Definitions.ClientToServerEvent<[]>(),
	JoinRoom: Net.Definitions.ClientToServerEvent<[roomId: string]>(),

	/* --------------------------------------------- Attributes --------------------------------------------- */
	IncreaseAttribute: Net.Definitions.ClientToServerEvent<[attributeKey: AttributeKey, amount: number]>(),

	/* --------------------------------------------- Progression -------------------------------------- */
	AddExperience: Net.Definitions.ClientToServerEvent<[amount: number]>(),

	/* --------------------------------------------- Abilities ------------------------------------------------- */
	ActivateAbility: Net.Definitions.ServerFunction<(abilityKey: AbilityKey) => boolean>(),

	/* --------------------------------------------- Profile Data --------------------------------------------- */
	GetData: Net.Definitions.ServerFunction<(dataKey: ProfileDataKey) => ProfileDataMap[ProfileDataKey] | undefined>(),

	/* --------------------------------------------- Settings ------------------------------------------------- */
	UpdatePlayerSetting: Net.Definitions.ClientToServerEvent<[key: SettingKey, value: boolean | string]>(),
});

export const ServerDispatch = Net.Definitions.Create({
	/* --------------------------------------------- Battle Room ------------------------------------------------- */
	RoomCountdown: Net.Definitions.ServerToClientEvent<[roomId: string, timeLeft: number]>(),

	/* --------------------------------------------- Abilities ------------------------------------------------- */
	AbilitiesUpdated: Net.Definitions.ServerToClientEvent<[abilities: ProfileDataMap["Abilities"]]>(),

	/* --------------------------------------------- Progression ------------------------------------------------- */
	ProgressionUpdated: Net.Definitions.ServerToClientEvent<[profileData: ProfileDataMap["Progression"]]>(),

	/* --------------------------------------------- Attributes ------------------------------------------------- */
	AttributesUpdated: Net.Definitions.ServerToClientEvent<[attributes: ProfileDataMap["Attributes"]]>(),

	/* --------------------------------------------- Settings ------------------------------------------------- */
	PlayerSettingsUpdated: Net.Definitions.ServerToClientEvent<[settings: ProfileDataMap["Settings"]]>(),

	/* --------------------------------------------- Resources --------------------------------------------- */
	ResourceUpdated: Net.Definitions.ServerToClientEvent<[key: ResourceKey, current: number, max: number]>(),
});
