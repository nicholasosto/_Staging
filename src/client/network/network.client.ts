import { AbilityKey, AttributesDTO, ClientDispatch, PlayerSettings, ResourceDTO, ServerDispatch } from "shared";
import { ProgressionDTO } from "shared/definitions/ProfileDefinitions/Progression";
import { PlayerStateInstance } from "client/states/PlayerState";
import { GameState } from "client/states";

const Events = {
	/* -- Profile Data -- */
	ProfileDataUpdated: ServerDispatch.Client.Get("ProfileDataUpdated"),
	ResourceUpdated: ServerDispatch.Client.Get("ResourceUpdated"),
	/* -- Game State -- */
	GameStateUpdated: ServerDispatch.Client.Get("GameStateUpdated"),
};

const Functions = {
	GetProfileDataByKey: ClientDispatch.Client.Get("GetDataByKey"),
	GetAllData: ClientDispatch.Client.Get("GetAllData"),
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

Functions.GetAllData.CallServerAsync().andThen((profileData) => {
	if (profileData) {
		warn("Client: Called GetAllData successfully. Profile data loaded:", profileData);
		// Initialize slices with the loaded profile data
		abilitySlice.UpdateAbilities(profileData.Abilities as AbilityKey[]);
		attributesSlice.UpdateAttributes(profileData.Attributes as AttributesDTO);
		progressionSlice.UpdateProgression(profileData.Progression as ProgressionDTO);
		currencySlice.UpdateCurrency(profileData.Currency as Record<string, number>);
	}
	GameState.DataLoaded.set(true);
	GameState.PlayerDataLoaded.set(true);
});

/* Profile Data Update ------------------------------- */
Events.ProfileDataUpdated.Connect((dataKey, data) => {
	warn(`Client Event - Profile Updated By Key( ${dataKey} ) called.`, data);
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

/* Game State Update -------------------------------------------- */
Events.GameStateUpdated.Connect((dataLoaded, playerDataLoaded) => {
	warn(
		`Client Listener: GameStateUpdated called. Data Loaded: ${dataLoaded}, Player Data Loaded: ${playerDataLoaded}`,
	);
	GameState.DataLoaded.set(dataLoaded);
	GameState.PlayerDataLoaded.set(playerDataLoaded);
});
