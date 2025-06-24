/// <reference types="@rbxts/types" />

/**
 * @file        Definitions.ts
 * @module      NetworkDefinitions
 * @layer       Shared/Network
 * @description Typed network event definitions for the project.
 */

/* =============================================== Imports =============================================== */
import Net from "@rbxts/net";
import { AttributeKey } from "shared/data";

/* =============================================== Network Definitions =============================================== */
export const Network = Net.Definitions.Create({
	// fire-and-forget from client → server
	SpawnManifestation: Net.Definitions.ClientToServerEvent<[formId: string, abilityId: string, bonusId: string]>(),
	IncreaseAttribute: Net.Definitions.ClientToServerEvent<[attributeKey: AttributeKey, amount: number]>(),
	AddGem: Net.Definitions.ClientToServerEvent<[gemid: string]>(),

	// server → client
	ProfileChanged: Net.Definitions.ServerToClientEvent<[data: unknown]>(),
});
