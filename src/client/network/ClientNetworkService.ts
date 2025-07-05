/// <reference types="@rbxts/types" />

/**
 * @file        ClientNetworkService.ts
 * @module      ClientNetworkService
 * @layer       Client/Network
 * @description Thin wrappers around client network calls.
 */

import { AbilityKey, SettingKey, ProfileDataKey, ProfileDataMap, ClientDispatch, AttributeKey } from "shared";

/* Event Signals */
const ActivateAbilitySignal = ClientDispatch.Client.Get("ActivateAbility");
const IncreaseAttributeSignal = ClientDispatch.Client.Get("IncreaseAttribute");
const UpdateSettingSignal = ClientDispatch.Client.Get("UpdatePlayerSetting");

/* Function Signals */
const GetProfileDataSignal = ClientDispatch.Client.Get("GetData");

/* ============================================= Client Get Data ==================================================== */
export async function GetProfileData<K extends ProfileDataKey>(key: K): Promise<ProfileDataMap[K] | undefined> {
	print(`CallServer: GetProfileData(${key}) called.`);
	return (await GetProfileDataSignal.CallServerAsync(key)) as ProfileDataMap[K] | undefined;
}

/* ============================================= Client Update Requests ==================================================== */
export function UpdatePlayerSetting(key: SettingKey, value: boolean | string): void {
	UpdateSettingSignal.SendToServer(key, value);
}

export function ActivateAbility(abilityKey: AbilityKey): boolean {
	return ActivateAbilitySignal.CallServer(abilityKey);
}
export async function IncreaseAttribute(attributeKey: AttributeKey, amount: number): Promise<void> {
	print(`CallServer: IncreaseAttribute(${attributeKey}, ${amount}) called.`);
	await IncreaseAttributeSignal.SendToServer(attributeKey, amount);
}
