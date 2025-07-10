import { AbilityService, DataService } from "server/services";
import { AbilityKey, ClientDispatch, ProfileDataKey } from "shared";
const Events = {
	UseAbility: ClientDispatch.Server.Get("UseAbility"),
};

const Functions = {
	/* -- Profile Data -- */
	GetAllProfileData: ClientDispatch.Server.Get("GetAllData"),
	GetProfileDataByKey: ClientDispatch.Server.Get("GetDataByKey"),
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

Events.UseAbility.Connect((player: Player, abilityKey: AbilityKey) => {
	AbilityService.Activate(player, abilityKey);
});
