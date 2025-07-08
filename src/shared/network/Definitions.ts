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
	/* -- Gems -- */
	AddGem: Net.Definitions.ClientToServerEvent<[gemId: string]>(),

	/* -- Battle Room -- */
	CreateRoom: Net.Definitions.ClientToServerEvent<[]>(),
	JoinRoom: Net.Definitions.ClientToServerEvent<[roomId: string]>(),

	/* -- Attributes -- */
	IncreaseAttribute: Net.Definitions.ClientToServerEvent<[attributeKey: AttributeKey, amount: number]>(),

	/* -- Progression -- */
	AddExperience: Net.Definitions.ClientToServerEvent<[amount: number]>(),

	/* -- Abilities -- */
	//ActivateAbility: Net.Definitions.ServerFunction<(abilityKey: AbilityKey) => boolean>(),
	CastRequest: Net.Definitions.ClientToServerEvent<[abilityKey: AbilityKey]>(),
	GetAbilities: Net.Definitions.ServerFunction<() => AbilityKey[] | undefined>(),
	SetAbilities: Net.Definitions.ClientToServerEvent<[abilities: AbilityKey[]]>(),

	/* -- Profile Data -- */
	GetData: Net.Definitions.ServerFunction<(dataKey: ProfileDataKey) => ProfileDataMap[ProfileDataKey] | undefined>(),

	/* -- Settings -- */
	UpdatePlayerSetting: Net.Definitions.ClientToServerEvent<[key: SettingKey, value: boolean | string]>(),
});

export const ServerDispatch = Net.Definitions.Create({
	/* -- Data Profile -- */
	ProfileData: Net.Definitions.ServerToClientEvent<[dataKey: ProfileDataKey, data: ProfileDataMap[ProfileDataKey]]>(),
	/* -- Battle Room -- */
	RoomCountdown: Net.Definitions.ServerToClientEvent<[roomId: string, timeLeft: number]>(),

	/* -- Resources -- */
	ResourceUpdated: Net.Definitions.ServerToClientEvent<[key: ResourceKey, data: ResourceDTO]>(),
});
