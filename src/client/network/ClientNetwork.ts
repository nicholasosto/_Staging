/// <reference types="@rbxts/types" />

/**
 * @file        ClientNetworkService.ts
 * @module      ClientNetworkService
 * @layer       Client/Network
 * @description Thin wrappers around client network calls.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-06-10 by Trembus
 *
 * @dependencies
 *   shared
 */

import { AbilityKey, SettingKey, ProfileDataKey, ProfileDataMap, ClientDispatch, AttributeKey, AdminNet } from "shared";

/* Abilities Signals*/
const UseAbilitySignal = ClientDispatch.Client.Get("UseAbility");
const SetAbilitiesSignal = ClientDispatch.Client.Get("SetAbilities");

/* Attributes Signals */
const ModifyAttributeSignal = ClientDispatch.Client.Get("ModifyAttribute");

/* Settings Signals */
const UpdateSettingSignal = ClientDispatch.Client.Get("UpdatePlayerSetting");

/* Function Signals */
const GetProfileDataSignal = ClientDispatch.Client.Get("GetData");

const SpawnWeaponSignal = AdminNet.Client.Get("SPAWN_WEAPON");

/* -- Abilities Functions -- */
function SetAbilities(abilities: AbilityKey[]): void {
	SetAbilitiesSignal.SendToServer(abilities);
}

function UseAbility(abilityKey: AbilityKey): void {
	UseAbilitySignal.SendToServer(abilityKey);
}

/* Profile Data Main Function */
export async function GetProfileData<K extends ProfileDataKey>(key: K): Promise<ProfileDataMap[K] | undefined> {
	print(`CallServer: GetProfileData(${key}) called.`);
	return (await GetProfileDataSignal.CallServerAsync(key)) as ProfileDataMap[K] | undefined;
}

/* Attributes */
export async function ModifyAttribute(attributeKey: AttributeKey, amount: number): Promise<void> {
	print(`CallServer: ModifyAttribute(${attributeKey}, ${amount}) called.`);
	await ModifyAttributeSignal.SendToServer(attributeKey, amount);
}

/* Settings */
export function UpdateSetting(key: SettingKey, value: boolean | string): void {
	print(`CallServer: UpdateSetting(${key}, ${value}) called.`);
	UpdateSettingSignal.SendToServer(key, value);
}

/* Under development */
export function SpawnWeapon(): void {
	print(`CallServer: SpawnWeapon called.`);
	const weapon = SpawnWeaponSignal.CallServerAsync();
}

export const ClientSend = {
	GetData: GetProfileData,
	SetAbilities: SetAbilities,
	UseAbility: UseAbility,
	ModifyAttribute: ModifyAttribute,
	UpdateSetting: UpdateSetting,
	SpawnWeapon: SpawnWeapon,
};