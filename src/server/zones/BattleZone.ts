import { Workspace } from "@rbxts/services";
import { ZoneBase } from "./ZoneBase";
import { PlayerHelpers } from "shared/helpers/PlayerCharacter";
import { NPCService, ResourcesService, SpawnNPC, StatusEffectService } from "server/services";
import { BeamFactory } from "shared/factory";
import { CharacterAttachments } from "shared/types";
import { SSEntity } from "shared/types/SSEntity";
import { SSEntityHelper } from "shared/helpers/SSEntityHelpers";
import { NPC } from "server/classes";
const beamFactory = new BeamFactory();

const PlayerEntered = (player: Player) => {
	let character = player.Character || player.CharacterAdded.Wait()[0];
	character = character as CharacterAttachments;
	StatusEffectService.AddEffect(player, "SpeedBoost"); // Example: Add a speed boost effect when entering the Battle Zone
	StatusEffectService.AddEffect(player, "Raged"); // Example: Add a rage effect when entering the Battle Zone
	if (character === undefined) {
		warn(`Player ${player.Name} entered the Battle Zone, but Attachments are not available.`);
		return;
	}
	print(`Player ${player.Name} has entered the Battle Zone.`);

	const closestRig = SSEntityHelper.getClosestRig(character as SSEntity, character.GetPivot(), 100);
	if (closestRig) {
		beamFactory.createBeam("Constrictor", character as SSEntity, closestRig.rig);
		beamFactory.CreateConstrictorBeam(character as SSEntity, closestRig.rig);
	}

	ResourcesService.ModifyResource(player, "Health", -20); // Example: Modify health resource when entering the Battle Zone

	/*-- NPC TEST --*/
	const npc = SpawnNPC("BLOOD_TOAD", character.GetPivot().add(new Vector3(0, 5, 0)));
	if (npc) {
		print(`NPC ${npc.name} spawned in the Battle Zone.`);
		npc.MoveNPC(npc, character.GetPivot().add(new Vector3(0, 10, 0))); // Move NPC above the player
	} else {
		warn(`Failed to spawn NPC in the Battle Zone for player ${player.Name}.`);
	}
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
