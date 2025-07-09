import { AbilityKey, AttributesDTO, PlayerSettings, ResourceDTO, ServerDispatch } from "shared";
import { AbilitySlice, AttributesSlice, ResourceSlice, ProgressionSlice, SettingsState } from "client/states";
import { ProgressionDTO } from "shared/definitions/ProfileDefinitions/Progression";

const Events = {
	/* -- Profile Data -- */
	ProfileDataUpdated: ServerDispatch.Client.Get("ProfileDataUpdated"),
	ResourceUpdated: ServerDispatch.Client.Get("ResourceUpdated"),
};

/* --- Listeners --- */
Events.ProfileDataUpdated.Connect((dataKey, data) => {
	print(`Client Listener: ProfileDataUpdated(${dataKey}) called.`, data);
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
	print(`Client Listener: ResourceUpdated(${key}) called.`, data);
	ResourceSlice.getInstance().UpdateResource(key, data);
});
warn("Client network initialized successfully.");
