import { Players } from "@rbxts/services";
import { AbilityKey, Network, SettingKey, PlayerSettings } from "shared";

/* Event Signals */
const ActivateAbilitySignal = Network.Client.Get("ActivateAbility");
const UpdateSettingSignal = Network.Client.Get("UpdatePlayerSetting");

/* Function Signals */
const GetPlayerAbilitiesSignal = Network.Client.Get("GetPlayerAbilities");
const GetPlayerSettingsSignal = Network.Client.Get("GetPlayerSettings");

export async function GetPlayerAbilities(): Promise<AbilityKey[] | undefined> {
	return await GetPlayerAbilitiesSignal.CallServerAsync(Players.LocalPlayer);
}

export function ActivateAbility(abilityKey: AbilityKey): void {
	ActivateAbilitySignal.SendToServer(abilityKey);
}

export async function GetPlayerSettings(): Promise<PlayerSettings> {
	return await GetPlayerSettingsSignal.CallServerAsync(Players.LocalPlayer);
}

export function UpdatePlayerSetting(key: SettingKey, value: boolean | string): void {
	UpdateSettingSignal.SendToServer(key, value);
}
