import { Workspace } from "@rbxts/services";
import { ZoneBase } from "./ZoneBase";
import { PlayerHelpers } from "shared/helpers/PlayerCharacter";
import { ResourcesService } from "server/services";
import { BeamFactory } from "shared/factory";
import { CharacterAttachments } from "shared/types";
import { SSEntity } from "shared/types/SSEntity";
import { SSEntityHelper } from "shared/helpers/SSEntityHelpers";
const beamFactory = new BeamFactory();

const PlayerEntered = (player: Player) => {
	let character = player.Character || player.CharacterAdded.Wait()[0];
	character = character as CharacterAttachments;
	if (character === undefined) {
		warn(`Player ${player.Name} entered the Battle Zone, but Attachments are not available.`);
		return;
	}
	print(`Player ${player.Name} has entered the Battle Zone.`);

	const rigs = SSEntityHelper.getRigsInRadius(character.GetPivot(), 100);
	if (rigs.size() === 0) return;

	beamFactory.createBeam("Constrictor", character as SSEntity, rigs[0].rig);
	beamFactory.CreateConstrictorBeam(character as SSEntity, rigs[0].rig);


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
