import { Workspace } from "@rbxts/services";
import { ZoneBase } from "./ZoneBase";
import { PlayerHelpers } from "shared/helpers/PlayerCharacter";
import { ResourcesService } from "server/services";

const PlayerEntered = (player: Player) => {
	const character = player.Character || player.CharacterAdded.Wait()[0];
	if (character === undefined) {
		print(`Player ${player.Name} entered the Battle Zone, but their character is not available.`);
		return;
	}

	if (character.PrimaryPart === undefined) {
		print(`Player ${player.Name} has no PrimaryPart in their character.`);
		return;
	}
	ResourcesService.ModifyResource(player, "Health", -20); // Example: Modify health resource when entering the Battle Zone
};

const PlayerLeft = (player: Player) => {
	print(`Player ${player.Name} has left the Battle Zone.`);
	// Additional logic for when a player leaves the Battle Zone can be added here
};

const BattleZoneProps = {
	container: Workspace.WaitForChild("Zones").WaitForChild("BattleZone") as Part,
	onPlayerEntered: PlayerEntered,
	onPlayerExited: PlayerLeft,
};

export const BattleZoneInstance = ZoneBase(BattleZoneProps);
