import { DataProfileController } from "server/services";
import { ClientDispatch, ProfileDataKey } from "shared";

const Functions = {
	/* -- Profile Data -- */
	GetProfileData: ClientDispatch.Server.Get("GetData"),
};

/* --- Listeners --- */
Functions.GetProfileData.SetCallback((player: Player, key: ProfileDataKey) => {
	const profile = DataProfileController.GetProfile(player);
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
