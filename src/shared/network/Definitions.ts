/// <reference types="@rbxts/types" />

/**
 * @file        Definitions.ts
 * @module      NetworkDefinitions
 * @layer       Shared/Network
 * @description Typed network event definitions for the project.
 */

/* =============================================== Imports =============================================== */
import Net from "@rbxts/net";
import { AbilityKey, AttributeKey } from "shared/definitions";

/* =============================================== Network Definitions =============================================== */
export const Network = Net.Definitions.Create({
	// Get SoulPlayer
	GetPlayerAbilities: Net.Definitions.ServerFunction<(player: Player) => AbilityKey[] | undefined>(),
	// fire-and-forget from client → server
	SpawnManifestation: Net.Definitions.ClientToServerEvent<[formId: string, abilityId: string, bonusId: string]>(),
	IncreaseAttribute: Net.Definitions.ClientToServerEvent<[attributeKey: AttributeKey, amount: number]>(),
	AddGem: Net.Definitions.ClientToServerEvent<[gemid: string]>(),
	JoinRoom: Net.Definitions.ClientToServerEvent<[roomId: string]>(),
	SetActiveGem: Net.Definitions.ClientToServerEvent<[roomId: string, gemId: string]>(),

	// client → server function
	CreateRoom: Net.Definitions.ServerFunction<() => string>(),

	// server → client
	ProfileChanged: Net.Definitions.ServerToClientEvent<[data: unknown]>(),
	RoomCountdown: Net.Definitions.ServerToClientEvent<[roomId: string, remaining: number]>(),
});
