/**
 * @file        src/server/network/ServerDispatch.ts
 * @module      ServerDispatch
 * @layer       Server/Network
 * @description Handles server-side network dispatching for game events.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */
/* =============================================== Imports =============================================== */
import { ResourceKey } from "shared";
import { Network } from "shared/network/Definitions";
import { ServerDispatch } from "shared/network/Definitions";

/* ================================================ Events =============================================== */

const ResourceUpdated = ServerDispatch.Server.Get("ResourceUpdated");

/* ================================================ Dispatches =============================================== */

export const UpdateResource = (player: Player, resourceKey: ResourceKey, current: number, max: number) => {
	//print(`Updating resource for player ${player.Name}: ${resourceKey} - Current: ${current}, Max: ${max}`);
	ResourceUpdated.SendToPlayer(player, resourceKey, current, max);
};
