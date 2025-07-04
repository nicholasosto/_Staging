import { Players } from "@rbxts/services";
import {
	AbilityKey,
	Network,
	SettingKey,
	PlayerSettings,
	ProfileDataKey,
	ProfileDataMap,
	ClientDispatch,
	AttributeKey,
} from "shared";

/* Event Signals */
const ActivateAbilitySignal = Network.Client.Get("ActivateAbility");
const UpdateSettingSignal = Network.Client.Get("UpdatePlayerSetting");

/* Function Signals */
const GetPlayerSettingsSignal = Network.Client.Get("GetPlayerSettings");
const GetProfileDataSignal = ClientDispatch.Client.Get("GetData");

/* ============================================= Client Get Data ==================================================== */
// export async function GetPlayerAbilities(): Promise<AbilityKey[] | undefined> {
// 	return await GetPlayerAbilitiesSignal.CallServerAsync(Players.LocalPlayer);
// }

export async function GetPlayerSettings(): Promise<PlayerSettings> {
	return await GetPlayerSettingsSignal.CallServerAsync(Players.LocalPlayer);
}
export async function GetProfileData<K extends ProfileDataKey>(key: K): Promise<ProfileDataMap[K] | undefined> {
	print(`CallServer: GetProfileData(${key}) called.`);
	return (await GetProfileDataSignal.CallServerAsync(key)) as ProfileDataMap[K] | undefined;
}

/* ============================================= Client Update Requests ==================================================== */
export function UpdatePlayerSetting(key: SettingKey, value: boolean | string): void {
	UpdateSettingSignal.SendToServer(key, value);
}

export function ActivateAbility(abilityKey: AbilityKey): void {
	ActivateAbilitySignal.SendToServer(abilityKey);
}
export async function IncreaseAttribute(attributeKey: AttributeKey, amount: number): Promise<void> {
	print(`CallServer: IncreaseAttribute(${attributeKey}, ${amount}) called.`);
	await ClientDispatch.Client.Get("IncreaseAttribute").SendToServer(attributeKey, amount);
}
