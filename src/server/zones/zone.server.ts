import { Workspace } from "@rbxts/services";
import { ZoneBase } from "./ZoneBase";
import { StatusEffectService } from "server/services";

/**
 * @file        zone.server.ts
 * @module      ZoneServer
 * @layer       Server/Zones
 * @description Module for managing zones in the game.
 */

/* ================================================ Containers =============================================== */
const ZoneContainer = Workspace.WaitForChild("Zones") as Folder;

/* Lobby Zone */
const Containers = {
	LobbyZone: ZoneContainer.WaitForChild("LobbyZone") as Part,
	BattleZone: ZoneContainer.WaitForChild("BattleZone") as Part,
};

function onPlayerEnteredZone(player: Player, zoneName: string): void {
	print(`Player ${player.Name} has entered the ${zoneName}.`);
	StatusEffectService.AddEffect(player, "Bleeding"); // Example effect when entering a zone

	// Additional logic for when a player enters a zone can be added here
}
function onPlayerExitedZone(player: Player, zoneName: string): void {
	print(`Player ${player.Name} has exited the ${zoneName}.`);
	// Additional logic for when a player exits a zone can be added here
}

const Lobby = ZoneBase(
	Containers.LobbyZone,
	(player) => {
		onPlayerEnteredZone(player, "Lobby Zone");
	},
	(player) => {
		onPlayerExitedZone(player, "Lobby Zone");
	},
);
const Battle = ZoneBase(
	Containers.BattleZone,
	(player) => {
		onPlayerEnteredZone(player, "Battle Zone");
	},
	(player) => {
		onPlayerExitedZone(player, "Battle Zone");
	},
);
