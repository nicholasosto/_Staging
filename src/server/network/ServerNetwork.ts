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
import { ResourceKey, ProfileDataKey, ProfileDataMap, ResourceDTO } from "shared";
import { ServerDispatch } from "shared";

/* ================================================ Events =============================================== */

/* Profile Data */
const ProfileData = ServerDispatch.Server.Get("ProfileData");

/* Resources */
const ResourceUpdated = ServerDispatch.Server.Get("ResourceUpdated");

export const ServerSend = {
	ProfileData: (player: Player, dataKey: ProfileDataKey, data: ProfileDataMap[ProfileDataKey]) => {
		ProfileData.SendToPlayer(player, dataKey, data);
	},
	ResourceUpdated: (player: Player, key: ResourceKey, data: ResourceDTO) => {
		ResourceUpdated.SendToPlayer(player, key, data);
	},
};
