import { Workspace } from "@rbxts/services";
import { DataService, AbilityService, WeaponService, NPCService } from "server/services";
import AttributesService from "server/services/AttributesService";
import { BeamService } from "server/services/BeamService";
import {
	AbilityKey,
	AdminNet,
	AttributeKey,
	ClientDispatch,
	NPCKey,
	ProfileDataKey,
	ProjectileCatalog,
	ProjectileKey,
	SSEntity,
} from "shared";
import { ProjectileInstance } from "shared/classes/ProjectileInstance";
import { BeamKey } from "shared/definitions/Beams";
import { RopeKey } from "shared/physics/physics.types";

const Functions = {
	/* -- Profile Data -- */
	GetAllProfileData: ClientDispatch.Server.Get("GetAllData"),
	GetProfileDataByKey: ClientDispatch.Server.Get("GetDataByKey"),
	/* -- Abilities -- */
	UseAbility: ClientDispatch.Server.Get("UseAbility"),
	ModifyAttribute: ClientDispatch.Server.Get("ModifyAttribute"),

	/*-- Admin Functions --*/
	SpawnRope: AdminNet.Server.Get("SPAWN_ROPE"),
	SpawnBeam: AdminNet.Server.Get("SPAWN_BEAM"),
	SpawnWeapon: AdminNet.Server.Get("SPAWN_WEAPON"),
	SpawnNPC: AdminNet.Server.Get("SPAWN_NPC"),
	SpawnProjectile: AdminNet.Server.Get("SPAWN_PROJECTILE"),
};

/* --- Listeners --- */
Functions.GetProfileDataByKey.SetCallback((player: Player, key: ProfileDataKey) => {
	const profile = DataService.GetProfile(player);
	if (profile) {
		const data = profile.Data[key];
		if (data !== undefined) {
			return data;
		} else {
			warn(`GetProfileData: Key "${key}" not found in profile for player ${player.Name}.`);
			return undefined;
		}
	} else {
		warn(`GetProfileData: No profile found for player ${player.Name}.`);
		return undefined;
	}
});

Functions.GetAllProfileData.SetCallback((player: Player) => {
	const profile = DataService.GetProfile(player);
	if (profile) {
		return profile.Data;
	} else {
		warn(`GetAllProfileData: No profile found for player ${player.Name}.`);
		return undefined;
	}
});

/* -- Abilities -- */
Functions.UseAbility.SetCallback((player: Player, abilityKey: AbilityKey) => {
	warn(`UseAbility called for player ${player.Name} with ability ${abilityKey}`);
	const success = AbilityService.Activate(player, abilityKey);
	print(`AbilityService.Activate(${player.Name}, ${abilityKey}) returned: ${success}`);
	if (!success) {
		warn(`Failed to activate ability ${abilityKey} for player ${player.Name}.`);
		return false;
	}
	warn(`Ability ${abilityKey} activated for player ${player.Name}.`);
	return success;
});

/* -- Attributes -- */
Functions.ModifyAttribute.SetCallback((player: Player, attributeKey: AttributeKey, amount: number) => {
	const attrs = AttributesService.ModAttribute(player, attributeKey, amount);
	if (attrs === undefined) {
		warn(`ModifyAttribute failed for player ${player.Name} on attribute ${attributeKey} with amount ${amount}.`);
		return undefined;
	}
	return attrs;
});

/* -- Admin Functions -- */
Functions.SpawnRope.Connect((player: Player, ropeKey?: RopeKey) => {
	task.spawn(() => {
		const character = player.Character || player.CharacterAdded.Wait()[0];
		const sourceEntity = character as SSEntity;
		const targetEntity = Workspace.FindFirstChild("SSEntityTarget") as SSEntity; // Replace with actual target entity logic
		print(`Spawning rope for player ${player.Name} from ${sourceEntity.Name} to ${targetEntity.Name}`);
	});
});

Functions.SpawnBeam.Connect((player: Player, beamKey: BeamKey) => {
	task.spawn(() => {
		const character = player.Character || player.CharacterAdded.Wait()[0];
		const sourceEntity = character as SSEntity;
		const targetEntity = Workspace.FindFirstChild("SSEntityTarget") as SSEntity; // Replace with actual target entity logic
		print(`Spawning beam for player ${player.Name} from ${sourceEntity.Name} to ${targetEntity.Name}`);
		BeamService.BeamBetween(beamKey, sourceEntity, targetEntity);
	});
});

Functions.SpawnWeapon.SetCallback((player: Player) => {
	print(`SpawnWeapon called for player ${player.Name}`);
	WeaponService.SpawnWeapon(player);
});

Functions.SpawnNPC.Connect((player: Player, npcKey: NPCKey) => {
	print(`SpawnNPC called for player ${player.Name} with npcKey: ${npcKey}`);
	task.spawn(() => {
		const character = player.Character || player.CharacterAdded.Wait()[0];
		const position = character.GetPivot().mul(new CFrame(0, 0, -10)); // Spawn slightly above the character
		NPCService.Spawn(npcKey, position);
	});
});

Functions.SpawnProjectile.Connect((player: Player, projectileKey: ProjectileKey) => {
	print(`SpawnProjectile called for player ${player.Name} with projectileKey: ${projectileKey}`);
	task.spawn(() => {
		const character = player.Character || player.CharacterAdded.Wait()[0];
		const startPosition = character.GetPivot().mul(new CFrame(0, 0, -10)); // Spawn slightly in front of the character
		const projectile = new ProjectileInstance(ProjectileCatalog[projectileKey], startPosition.Position);
		print(`Projectile ${projectileKey} spawned for player ${player.Name} at position ${startPosition.Position}`);
	});
});
