/// <reference types="@rbxts/types" />

/**
 * @file        ProfileService.ts
 * @module      ProfileService
 * @layer       Server/Services
 * @description Wrapper around ProfileService for player data.
 */

/* =============================================== Imports =============================================== */
import ProfileService from "@rbxts/profileservice";
import { AttributesDTO, DefaultAttributes } from "shared/data";
/* =============================================== Constants =============================================== */

const DATASTORE_NAME = "SoulSteelPlayerProfile";
/* =============================================== Types =============================================== */

export interface PlayerProfile {
	xp: number;
	gems: number;
	slots: number;
	attributes: AttributesDTO;
}

export const Profiles = ProfileService.GetProfileStore<PlayerProfile>(DATASTORE_NAME, {
	xp: 0,
	gems: 0,
	slots: 1,
	attributes: DefaultAttributes,
});
/* =============================================== Functions =============================================== */

export function loadProfile(player: Player) {
	const profile = Profiles.LoadProfileAsync(`Player_${player.UserId}`);
	if (!profile) player.Kick("Data failed to load!");
	return profile!;
}
