// @generated-scaffold
/// <reference types="@rbxts/types" />

/**
 * @file        Listener.ts
 * @module      ServerListener
 * @layer       Server/Network
 * @description Receives network events.
 */

import { ServerRoutes } from "../../Shared/NetDefinitions";

export function initListener() {
	print(`Listening on routes: ${ServerRoutes.AbilityUse}`);
}
