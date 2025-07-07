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

/* Event Signals */
//const ActivateAbilitySignal = ClientDispatch.Client.Get("ActivateAbility");
const CastRequestSignal = ClientDispatch.Client.Get("CastRequest");
const GetAbilitiesSignal = ClientDispatch.Client.Get("GetAbilities");
const SetAbilitiesSignal = ClientDispatch.Client.Get("SetAbilities");
const IncreaseAttributeSignal = ClientDispatch.Client.Get("IncreaseAttribute");
const AddExperienceSignal = ClientDispatch.Client.Get("AddExperience");
const UpdateSettingSignal = ClientDispatch.Client.Get("UpdatePlayerSetting");

/* Function Signals */
const GetProfileDataSignal = ClientDispatch.Client.Get("GetData");
const SpawnWeaponSignal = AdminNet.Client.Get("SPAWN_WEAPON");
/* ============================================= Client Get Data ==================================================== */
async function GetProfileData<K extends ProfileDataKey>(key: K): Promise<ProfileDataMap[K] | undefined> {
	print(`CallServer: GetProfileData(${key}) called.`);
	return (await GetProfileDataSignal.CallServerAsync(key)) as ProfileDataMap[K] | undefined;
}

/* ============================================= Client Update Requests ==================================================== */
function UpdatePlayerSetting(key: SettingKey, value: boolean | string): void {
	UpdateSettingSignal.SendToServer(key, value);
}

// export function ActivateAbility(abilityKey: AbilityKey): boolean {
// 	return ActivateAbilitySignal.CallServer(abilityKey);
// }
async function IncreaseAttribute(attributeKey: AttributeKey, amount: number): Promise<void> {
	print(`CallServer: IncreaseAttribute(${attributeKey}, ${amount}) called.`);
	await IncreaseAttributeSignal.SendToServer(attributeKey, amount);
}

function AddExperience(amount: number): void {
	AddExperienceSignal.SendToServer(amount);
}

async function GetAbilities(): Promise<AbilityKey[] | undefined> {
	return (await GetAbilitiesSignal.CallServerAsync()) as AbilityKey[] | undefined;
}

function SetAbilities(abilities: AbilityKey[]): void {
	SetAbilitiesSignal.SendToServer(abilities);
}

function CastAbility(abilityKey: AbilityKey): void {
	CastRequestSignal.SendToServer(abilityKey);
}

function SpawnWeapon(): void {
	print(`CallServer: SpawnWeapon called.`);
	const weapon = SpawnWeaponSignal.CallServerAsync();
}

export const CNet = {
	/* - Profile Data - */
	GetProfileData,

	/* - Player Settings - */
	UpdatePlayerSetting,

	/* - Attributes - */
	IncreaseAttribute,

	/* - Progression - */
	AddExperience,

	/* - Equipment - */
	SpawnWeapon,

	/* - Abilities - */
	GetAbilities,
	SetAbilities,
	CastAbility,
};
