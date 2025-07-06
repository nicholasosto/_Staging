// @generated-scaffold
/// <reference types="@rbxts/types" />

/**
 * @file        Listener.ts
 * @module      ClientListener
 * @layer       Client/Network
 * @description Handles incoming events from server.
 */

import { ClientRoutes } from "../..//Shared/NetDefinitions";

export function initListener() {
	print(`Client listening on ${ClientRoutes.StatsUpdate}`);
}
