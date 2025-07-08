import { AbilityKey, AttributesDTO, PlayerSettings, ResourceDTO, ServerDispatch } from "shared";
import { AbilitySlice, AttributesSlice, ResourceSlice, ProgressionSlice, SettingsState } from "client/states";
import { ProgressionDTO } from "shared/definitions/ProfileDefinitions/Progression";

const Events = {
	/* -- Profile Data -- */
	GetProfileData: ServerDispatch.Client.Get("ProfileData"),
	ResourceUpdated: ServerDispatch.Client.Get("ResourceUpdated"),
	RoomCountdown: ServerDispatch.Client.Get("RoomCountdown"),
};

/* --- Listeners --- */
Events.GetProfileData.Connect((dataKey, data) => {
	switch (dataKey) {
		case "Abilities":
			AbilitySlice.getInstance().UpdateAbilities(data as AbilityKey[]);
			break;
		case "Attributes":
			AttributesSlice.getInstance().UpdateAttributes(data as AttributesDTO);
			break;
		case "Progression":
			ProgressionSlice.getInstance().UpdateProgression(data as ProgressionDTO);
			break;
		case "Settings":
			SettingsState.getInstance().UpdateSettings(data as PlayerSettings);
			break;
	}
});
Events.ResourceUpdated.Connect((key, data) => {
	ResourceSlice.getInstance().UpdateResource(key, data);
});
Events.RoomCountdown.Connect((roomId, timeLeft) => {
	// Handle room countdown updates
	print(`Room ${roomId} countdown: ${timeLeft} seconds left`);
});
