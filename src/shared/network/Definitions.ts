/// <reference types="@rbxts/types" />

/**
 * @file        Definitions.ts
 * @module      NetworkDefinitions
 * @layer       Shared/Network
 * @description Typed network event definitions for the project.
 */

/* =============================================== Imports =============================================== */
import Net from "@rbxts/net";

/* =============================================== Network Definitions =============================================== */
export const Network = Net.Definitions.Create({
	// fire-and-forget from client → server
	SpawnManifestation: Net.Definitions.ClientToServerEvent<[cframe: CFrame]>(),

	// server → client
	ProfileChanged: Net.Definitions.ServerToClientEvent<[data: unknown]>(),
});
