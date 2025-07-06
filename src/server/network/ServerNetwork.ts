/**
 * @file        src/server/network/ServerDispatch.ts
 * @module      ServerDispatch
 * @layer       Server/Network
 * @description Handles server-side network dispatching for game events.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */
/* =============================================== Imports =============================================== */
import { AbilityKey, ResourceKey, AttributeKey, NPCKey, ProfileDataKey, SettingKey } from "shared";
import {
	DataProfileController,
	AttributesService,
	NPCService,
	ManifestationForgeService,
	ResourcesService,
	BattleRoomService,
	SettingsService,
	AbilityService,
	StatusEffectService,
	ProgressionService,
	WeaponService,
} from "server/services";
import { AdminNet, ClientDispatch, ServerDispatch } from "shared/network/Definitions";

/* ================================================ Events =============================================== */

/* Profile Data */
const GetProfileDataSignal = ClientDispatch.Server.Get("GetData");

/* Abilities */
const ActivateAbilitySignal = ClientDispatch.Server.Get("ActivateAbility");
const AbilitiesUpdated = ServerDispatch.Server.Get("AbilitiesUpdated");

/* Attributes */
const IncreaseAttributeSignal = ClientDispatch.Server.Get("IncreaseAttribute");
const AttributesUpdated = ServerDispatch.Server.Get("AttributesUpdated");

/* Progression */
const AddExperienceSignal = ClientDispatch.Server.Get("AddExperience");
const ProgressionUpdated = ServerDispatch.Server.Get("ProgressionUpdated");

/* Battle Rooms */
const CreateRoomSignal = ClientDispatch.Server.Get("CreateRoom");
const JoinRoomSignal = ClientDispatch.Server.Get("JoinRoom");
const RoomCountdown = ServerDispatch.Server.Get("RoomCountdown");

/* Gems */
const AddGemSignal = ClientDispatch.Server.Get("AddGem");

/* Settings */
const UpdateSettingSignal = ClientDispatch.Server.Get("UpdatePlayerSetting");
const PlayerSettingsUpdated = ServerDispatch.Server.Get("PlayerSettingsUpdated");

/* Resources */
const ResourceUpdated = ServerDispatch.Server.Get("ResourceUpdated");

/* Admin Network Events */
const SpawnNPCSignal = AdminNet.Server.Get("SPAWN_NPC");
const SpawnWeaponSignal = AdminNet.Server.Get("SPAWN_WEAPON");

/* ================================================ Dispatches =============================================== */

/**
 * @function UpdateResource
 * @description Updates a player's resource and sends the updated values to the player.
 * @param player - The player whose resource is being updated.
 * @param resourceKey - The key of the resource to update.
 * @param current - The current amount of the resource.
 * @param max - The maximum amount of the resource.
 */
export const UpdateResource = (player: Player, resourceKey: ResourceKey, current: number, max: number) => {
	//print(`Updating resource for player ${player.Name}: ${resourceKey} - Current: ${current}, Max: ${max}`);
	ResourceUpdated.SendToPlayer(player, resourceKey, current, max);
};

/**
 * Sends a countdown to all players in a room.
 * @function SendRoomCountdown
 * @description Sends a countdown message to all players in a specific room.
 * @param players - The list of players in the room.
 * @param roomId - The ID of the room.
 * @param timeLeft - The time left in the countdown.
 */
export const SendRoomCountdown = (players: Player[], roomId: string, timeLeft: number) => {
	//print(`Sending room countdown to player ${player.Name} for room ${roomId}: ${timeLeft} seconds left`);
	RoomCountdown.SendToPlayers(players, roomId, timeLeft);
};

/**
 * @function SendAbilitiesUpdated
 * @description Sends updated abilities to a list of players.
 * @param players - The list of players to send the updated abilities to.
 * @param abilities - The list of ability keys that have been updated.
 */
export const SendAbilitiesUpdated = (players: Player[], abilities: AbilityKey[]) => {
	//print(`Sending abilities updated to player ${player.Name}: ${abilities}`);
	AbilitiesUpdated.SendToPlayers(players, abilities);
};

/**
 * @function SendAttributesUpdated
 * @description Sends updated attributes to a player.
 * @param player - The player whose attributes have been updated.
 */
export const SendAttributesUpdated = (player: Player) => {
	const playerAttributes = DataProfileController.GetProfile(player)?.Data.Attributes;
	if (playerAttributes === undefined) {
		print(`No attributes found for player ${player.Name}`);
		return;
	}

	print(`Sending attributes updated to player ${player.Name}: ${playerAttributes}`);
	AttributesUpdated.SendToPlayer(player, playerAttributes);
};

/**
 * @function SendPlayerSettingsUpdated
 * @description Sends updated settings to a player.
 * @param player - The player whose settings have changed.
 */
export const SendPlayerSettingsUpdated = (player: Player) => {
	const settings = SettingsService.GetSettings(player);
	PlayerSettingsUpdated.SendToPlayer(player, settings);
};

/**
 * @function SendProgressionUpdated
 * @description Sends updated progression data to a player.
 * @param player - The player whose progression has changed.
 */
export const SendProgressionUpdated = (player: Player) => {
	const progression = DataProfileController.GetProfile(player)?.Data.Progression;
	if (progression) {
		ProgressionUpdated.SendToPlayer(player, progression);
	}
};

/* Function Handlers: ==================================================================== */
/**
 * @function ActivateAbilitySignal
 * @description Handles the activation of abilities by players.
 * @param player - The player activating the ability.
 * @param abilityKey - The key of the ability being activated.
 * @returns A boolean indicating success or failure of the ability activation.
 */
ActivateAbilitySignal.SetCallback((player: Player, abilityKey: AbilityKey) => {
	//print(`Player ${player.Name} activating ability: ${abilityKey}`);
	return AbilityService.Activate(player, abilityKey);
});

/**
 * @function IncreaseAttributeSignal
 * @description Increases a player's attribute by a specified amount.
 * @param player - The player whose attribute is being increased.
 * @param attributeKey - The key of the attribute to increase.
 * @param amount - The amount to increase the attribute by.
 */
IncreaseAttributeSignal.Connect((player: Player, attributeKey: AttributeKey, amount: number) => {
	//print(`Increasing attribute for player ${player.Name}: ${attributeKey} by ${amount}`);
	AttributesService.Increase(player, attributeKey, amount);
	SendAttributesUpdated(player);
});

/**
 * @function AddExperienceSignal
 * @description Adds experience points to a player's progression.
 * @param player - The player gaining experience.
 * @param amount - Amount of experience to add.
 */
AddExperienceSignal.Connect((player: Player, amount: number) => {
	ProgressionService.AddExperience(player, amount);
	SendProgressionUpdated(player);
});

/**
 * @function CreateRoomSignal
 * @description Creates a new battle room for the player.
 * @param player - The player creating the room.
 * @returns The ID of the created room.
 */
CreateRoomSignal.Connect((player: Player) => {
	//print(`Creating battle room for player: ${player.Name}`);
	return BattleRoomService.CreateRoom(player);
});

/**
 * @function JoinRoomSignal
 * @description Allows a player to join an existing battle room.
 * @param player - The player joining the room.
 * @param roomId - The ID of the room to join.
 */
JoinRoomSignal.Connect((player: Player, roomId: string) => {
	BattleRoomService.JoinRoom(player, roomId);
});

/**
 * @function AddGemSignal
 * @description Handles requests to add a gem to the player's profile. Placeholder until forge logic is complete.
 * @param player - The player requesting the gem addition.
 * @param gemId - The gem identifier.
 */
AddGemSignal.Connect((player: Player, gemId: string) => {
	print(`AddGemSignal received from ${player.Name} for gem ${gemId}`);
	// TODO: integrate with ManifestationForgeService when ready
});

/**
 * @function UpdateSettingSignal
 * @description Updates a player's setting and notifies them of the change.
 * @param player - The player updating a setting.
 * @param key - The setting key to update.
 * @param value - The new value for the setting.
 */
UpdateSettingSignal.Connect((player: Player, key: SettingKey, value: boolean | string) => {
	SettingsService.SetSettings(player, key, value);
	SendPlayerSettingsUpdated(player);
});

/**
 * @function SpawnNPCSignal
 * @description Spawns an NPC for the player at their current position.
 * @param player - The player requesting the NPC spawn.
 * @param npcKey - The key of the NPC to spawn.
 */
SpawnNPCSignal.Connect((player: Player, npcKey: NPCKey) => {
	//print(`Player ${player.Name} requesting NPC spawn: ${npcKey}`);
	const playerCharacter = player.Character || player.CharacterAdded.Wait()[0];
	if (playerCharacter === undefined) {
		warn(`Player ${player.Name} has no character to spawn NPC into.`);
		return;
	}
	const playerCFrame = playerCharacter.GetPivot();
	const spawnCFrame = playerCFrame.mul(new CFrame(0, 0, -5));
	NPCService.Spawn(npcKey, spawnCFrame);
});

/**
 * @function GetProfileDataSignal
 * @description Retrieves profile data for a player based on the specified key.
 * @param player - The player requesting their profile data.
 * @param dataKey - The key of the profile data to retrieve.
 * @returns The requested profile data or undefined if not found.
 */
GetProfileDataSignal.SetCallback((player: Player, dataKey: ProfileDataKey) => {
	//print(`Player ${player.Name} requesting profile data for key: ${dataKey}`);
	const playerProfile = DataProfileController.GetProfile(player);
	if (playerProfile === undefined) {
		warn(`Profile not found for ${player.Name}`);
		return undefined;
	}
	if (playerProfile.Data[dataKey] === undefined) {
		warn(`Data key ${dataKey} not found in profile for ${player.Name}`);
		return undefined;
	}
	return playerProfile.Data[dataKey];
});

/**
 * @function SpawnWeaponSignal
 * @description Spawns a weapon for the player based on the provided weapon ID.
 * @param player - The player requesting the weapon spawn.
 * @param weaponId - The ID of the weapon to spawn.
 */
SpawnWeaponSignal.SetCallback((player: Player) => {
	//print(`Player ${player.Name} requesting weapon spawn: ${weaponId}`);
	const character = player.Character || player.CharacterAdded.Wait()[0];
	if (character === undefined) {
		warn(`Character not found for player ${player.Name}`);
		return;
	}
	WeaponService.SpawnWeapon(character);
});
