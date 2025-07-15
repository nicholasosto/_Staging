import { DataService, AbilityService, WeaponService } from "server/services";
import AttributesService from "server/services/AttributesService";
import { AbilityKey, AdminNet, AttributeKey, ClientDispatch, ProfileDataKey } from "shared";

const Functions = {
	/* -- Profile Data -- */
	GetAllProfileData: ClientDispatch.Server.Get("GetAllData"),
	GetProfileDataByKey: ClientDispatch.Server.Get("GetDataByKey"),
	/* -- Abilities -- */
	UseAbility: ClientDispatch.Server.Get("UseAbility"),
	ModifyAttribute: ClientDispatch.Server.Get("ModifyAttribute"),

	/*-- Admin Functions --*/
	SpawnRope: AdminNet.Server.Get("SPAWN_ROPE"),
	SpawnWeapon: AdminNet.Server.Get("SPAWN_WEAPON"),
	SpawnNPC: AdminNet.Server.Get("SPAWN_NPC"),
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
Functions.SpawnRope.Connect((player: Player, ropeKey?: string) => {
	if (ropeKey !== undefined) {
		print(`SpawnRope called for player ${player.Name} with ropeKey: ${ropeKey}`);
		// Logic to spawn the rope
	} else {
		print(`SpawnRope called for player ${player.Name} without a specific ropeKey.`);
	}
});

Functions.SpawnWeapon.SetCallback((player: Player) => {
	print(`SpawnWeapon called for player ${player.Name}`);
	WeaponService.SpawnWeapon(player);
});

Functions.SpawnNPC.Connect((player: Player, npcKey: string) => {
	print(`SpawnNPC called for player ${player.Name} with npcKey: ${npcKey}`);
	// Logic to spawn the NPC
});
