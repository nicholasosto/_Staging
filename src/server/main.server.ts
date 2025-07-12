/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { DataService } from "./services";
import { ServiceWrapper } from "./ServiceWrapper";
import { CollectionService, Players } from "@rbxts/services";
/* =============================================== Initialization ========================================= */
function onCharacterLoaded(character: Model) {
	CollectionService.AddTag(character, "SSEntity");
	print(`Character loaded: ${character.Name} and tag added.`);
}

function onDataLoaded(player: Player, data: unknown) {
	print(`Data loaded for player: ${player.Name}`, data);
	const HumanoidDescription = new Instance("HumanoidDescription") as HumanoidDescription;
	HumanoidDescription.HeadColor = Color3.fromRGB(255, 255, 255);
	HumanoidDescription.TorsoColor = Color3.fromRGB(255, 255, 0);

	const description = Players.GetHumanoidDescriptionFromUserId(3100629956);
	if (description) {
		player.LoadCharacterWithHumanoidDescription(description);
	} else {
		warn(`Failed to load HumanoidDescription for player: ${player.Name}`);
	}
}

function onPlayerAdded(player: Player) {
	player.CharacterAdded.Connect(onCharacterLoaded);
	DataService.RegisterPlayer(player);
	const profile = DataService.GetProfile(player);
	onDataLoaded(player, profile?.Data);
	warn(`Data profile loaded for player: ${player.Name}`, profile);
}

function onPlayerRemoving(player: Player) {
	ServiceWrapper.UnregisterPlayer(player);
}
Players.GetPlayers().forEach(onPlayerAdded); // Register existing players
Players.PlayerAdded.Connect(onPlayerAdded);
Players.PlayerRemoving.Connect(onPlayerRemoving);
