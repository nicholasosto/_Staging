/// <reference types="@rbxts/types" />

/**
 * @file        targeting.remotes.ts
 * @module      TargetingRemotes
 * @layer       Shared/Network
 * @description Net definitions for targeting events.
 */

import Net from "@rbxts/net";
import { SSEntity } from "shared/types/SSEntity";

export const TargetingRemotes = Net.Definitions.Create({
	SelectTarget: Net.Definitions.ClientToServerEvent<[target: SSEntity]>(),
	ClearTarget: Net.Definitions.ClientToServerEvent<[]>(),
	TargetSelected: Net.Definitions.ServerToClientEvent<[target: SSEntity]>(),
	TargetCleared: Net.Definitions.ServerToClientEvent<[]>(),
});
