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
export const Network = Net.Definitions.Create({
        // fire-and-forget from client → server
	SpawnManifestation: Net.Definitions.ClientToServerEvent<[formId: string, abilityId: string, bonusId: string]>(),
	IncreaseAttribute: Net.Definitions.ClientToServerEvent<[attributeKey: AttributeKey, amount: number]>(),
	AddGem: Net.Definitions.ClientToServerEvent<[gemid: string]>(),
	JoinRoom: Net.Definitions.ClientToServerEvent<[roomId: string]>(),
	SetActiveGem: Net.Definitions.ClientToServerEvent<[roomId: string, gemId: string]>(),

	GetPlayerSettings: Net.Definitions.ServerFunction<(player: Player) => PlayerSettings>(),
	UpdatePlayerSetting: Net.Definitions.ClientToServerEvent<[key: SettingKey, value: boolean | string]>(),

	// client → server function
	CreateRoom: Net.Definitions.ServerFunction<() => string>(),

	// server → client
	ProfileChanged: Net.Definitions.ServerToClientEvent<[data: unknown]>(),
	RoomCountdown: Net.Definitions.ServerToClientEvent<[roomId: string, remaining: number]>(),

	/* Activate Ability */
	ActivateAbility: Net.Definitions.ClientToServerEvent<[abilityKey: AbilityKey]>(),
});

export const TestNetwork = Net.Definitions.Create({
	SPAWN_NPC: Net.Definitions.ClientToServerEvent<[npcId: NPCKey]>(),
});

export const ClientDispatch = Net.Definitions.Create({
	IncreaseAttribute: Net.Definitions.ClientToServerEvent<[attributeKey: AttributeKey, amount: number]>(),
	ActivateAbility: Net.Definitions.ClientToServerEvent<[abilityKey: AbilityKey]>(),
	GetData: Net.Definitions.ServerFunction<(dataKey: ProfileDataKey) => ProfileDataMap[ProfileDataKey] | undefined>(),
});

export const ServerDispatch = Net.Definitions.Create({
	ResourceUpdated: Net.Definitions.ServerToClientEvent<[key: ResourceKey, current: number, max: number]>(),
	AbilitiesUpdated: Net.Definitions.ServerToClientEvent<[abilities: AbilityKey[]]>(),
});
