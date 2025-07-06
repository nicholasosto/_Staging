// @generated-scaffold
/// <reference types="@rbxts/types" />

/**
 * @file        Dispatcher.ts
 * @module      ClientDispatcher
 * @layer       Client/Network
 * @description Sends requests to server.
 */

import { ServerRoutes } from "../..//Shared/NetDefinitions";

export function useAbility() {
	print(`Requesting ${ServerRoutes.AbilityUse}`);
}
