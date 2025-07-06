// @generated-scaffold
/// <reference types="@rbxts/types" />

/**
 * @file        Dispatcher.ts
 * @module      ServerDispatcher
 * @layer       Server/Network
 * @description Sends events to clients.
 */

import { ClientRoutes } from "../../Shared/NetDefinitions";

export function dispatchStats(player: Player) {
	print(`Dispatching stats on ${ClientRoutes.StatsUpdate}`);
}
