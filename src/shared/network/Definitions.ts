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
	ResourceDTO,
} from "shared/definitions";
import { MessageShape } from "shared/definitions/Message";

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
	/* -- Attributes -- */
	IncreaseAttribute: Net.Definitions.ClientToServerEvent<[attributeKey: AttributeKey, amount: number]>(),

	/* -- Abilities -- */
	UseAbility: Net.Definitions.ServerAsyncFunction<(abilityKey: AbilityKey) => boolean>(),
	AddAbility: Net.Definitions.ClientToServerEvent<[abilityKey: AbilityKey]>(),
	SetAbilities: Net.Definitions.ClientToServerEvent<[abilities: AbilityKey[]]>(),

	/* -- Profile Data -- */
	GetAllData: Net.Definitions.ServerAsyncFunction<() => ProfileDataMap | undefined>(),
	GetDataByKey:
		Net.Definitions.ServerAsyncFunction<(dataKey: ProfileDataKey) => ProfileDataMap[ProfileDataKey] | undefined>(),

	/* -- Update Data -- */
	UpdatePlayerSetting: Net.Definitions.ClientToServerEvent<[key: SettingKey, value: boolean | string]>(),
	ModifyAttribute: Net.Definitions.ClientToServerEvent<[attributeKey: AttributeKey, amount: number]>(),
});

export const ServerDispatch = Net.Definitions.Create({
	/* -- Data Profile -- */
	ProfileDataUpdated:
		Net.Definitions.ServerToClientEvent<[dataKey: ProfileDataKey, data: ProfileDataMap[ProfileDataKey]]>(),
	/* -- Resources -- */
	ResourceUpdated: Net.Definitions.ServerToClientEvent<[key: ResourceKey, data: ResourceDTO]>(),
	/* -- Game State -- */
	GameStateUpdated: Net.Definitions.ServerToClientEvent<[dataLoaded: boolean, playerDataLoaded: boolean]>(),
	/* -- Messages -- */
	SendMessageToPlayer: Net.Definitions.ServerToClientEvent<[message: MessageShape]>(),
});
