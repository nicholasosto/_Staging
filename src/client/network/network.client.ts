import { AbilityKey, AttributesDTO, PlayerSettings, ResourceDTO, ServerDispatch } from "shared";
import { AbilitySlice, AttributesSlice, ResourceSlice, ProgressionSlice, SettingsState } from "client/states";
import { ProgressionDTO } from "shared/definitions/ProfileDefinitions/Progression";
import PlayerState from "client/states/PlayerState";

const Events = {
	/* -- Profile Data -- */
	ProfileDataUpdated: ServerDispatch.Client.Get("ProfileDataUpdated"),
	ResourceUpdated: ServerDispatch.Client.Get("ResourceUpdated"),
};

/* --- Listeners --- */
Events.ProfileDataUpdated.Connect((dataKey, data) => {
	warn(`Client Listener: ProfileDataUpdated(${dataKey}) called.`, data);
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
	warn(`\nClient Listener: ResourceUpdated(${key}) called.`, data);
	PlayerState.getInstance().Resources.UpdateResource(key, data as ResourceDTO);
	warn(
		"\nResource updated successfully:",
		key,
		PlayerState.getInstance().Resources[key].current.get(),
		"/",
		PlayerState.getInstance().Resources[key].max.get(),
	);
});
warn("Client network initialized successfully.");
