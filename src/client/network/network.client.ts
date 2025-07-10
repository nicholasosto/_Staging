import { AbilityKey, AttributesDTO, PlayerSettings, ResourceDTO, ServerDispatch } from "shared";
import { ProgressionDTO } from "shared/definitions/ProfileDefinitions/Progression";
import { PlayerStateInstance } from "client/states/PlayerState";

const Events = {
	/* -- Profile Data -- */
	ProfileDataUpdated: ServerDispatch.Client.Get("ProfileDataUpdated"),
	ResourceUpdated: ServerDispatch.Client.Get("ResourceUpdated"),
};

/* State Slices ------------------------------------- */
// These slices are used to manage the player's abilities, attributes, progression, resources, and settings

/* Slices -------------------------------------- */
const abilitySlice = PlayerStateInstance.Abilities;
const attributesSlice = PlayerStateInstance.Attributes;
const progressionSlice = PlayerStateInstance.Progression;
const resourceSlice = PlayerStateInstance.Resources;
const currencySlice = PlayerStateInstance.Currency;
const settingsSlice = PlayerStateInstance.Settings;

/* --- Listeners --- */

/* Profile Data Update ------------------------------- */
Events.ProfileDataUpdated.Connect((dataKey, data) => {
	warn(`Client Listener: ProfileDataUpdated(${dataKey}) called.`, data);
	switch (dataKey) {
		case "Abilities":
			abilitySlice.UpdateAbilities(data as AbilityKey[]);
			break;
		case "Attributes":
			attributesSlice.UpdateAttributes(data as AttributesDTO);
			break;
		case "Progression":
			progressionSlice.UpdateProgression(data as ProgressionDTO);
			break;
		case "Settings":
			settingsSlice.UpdateSettings(data as PlayerSettings);
			break;
		case "Currency":
			currencySlice.UpdateCurrency(data as Record<string, number>);
			break;
		default:
			warn(`Unhandled ProfileDataUpdated key: ${dataKey}`);
			break;
	}
});

/* Resource Update -------------------------------------------- */
Events.ResourceUpdated.Connect((key, data) => {
	resourceSlice.UpdateResource(key, data as ResourceDTO);
});
warn("Client network initialized successfully.");
