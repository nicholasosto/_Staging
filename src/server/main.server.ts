/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { Players } from "@rbxts/services";
import { ManifestationForgeService, DataProfileController, BattleRoomService } from "./services";
import { OrganismFood } from "./classes/playground/OrganismFood";
import SoulPlayer from "./classes/player/SoulPlayer";

/* =============================================== Initialization ========================================= */
DataProfileController.Start();
ManifestationForgeService.Start();
BattleRoomService.Start();
OrganismFood.SpawnResource(new CFrame(0, 10, 0));

function CharacterAdded(player: Player, character: Model) {
	/* Update the SoulPlayer instance with the new character */
	const soulPlayer = SoulPlayer.GetSoulPlayer(player);
	if (soulPlayer) {
		soulPlayer.UpdateCharacter(character);
	} else {
		warn(`SoulPlayer not found for ${player.Name}.`);
	}
}
/* ================== Player Joined Event ================== */
Players.PlayerAdded.Connect((player) => {
	if (SoulPlayer.GetSoulPlayer(player)) {
		warn(`SoulPlayer already exists for ${player.Name}.`);
		return;
	}
	const character = player.Character || player.CharacterAdded.Wait()[0];
	/* Create a new SoulPlayer instance */
	new SoulPlayer(player, character);
});
