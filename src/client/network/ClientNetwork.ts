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

import { AbilityKey, SettingKey, ClientDispatch, AttributeKey, AdminNet, AttributesDTO } from "shared";

/* Abilities Signals*/
const UseAbilitySignal = ClientDispatch.Client.Get("UseAbility");
const SetAbilitiesSignal = ClientDispatch.Client.Get("SetAbilities");

/* Attributes Signals */
const ModifyAttributeSignal = ClientDispatch.Client.Get("ModifyAttribute");

/* Settings Signals */
const UpdateSettingSignal = ClientDispatch.Client.Get("UpdatePlayerSetting");

/* Function Signals */
const GetProfileDataByKey = ClientDispatch.Client.Get("GetDataByKey");

/* Spawn Weapon Signal */
const SpawnWeaponSignal = AdminNet.Client.Get("SPAWN_WEAPON");

/* -- Abilities Functions -- */
function SetAbilities(abilities: AbilityKey[]): void {
	SetAbilitiesSignal.SendToServer(abilities);
}

async function UseAbility(abilityKey: AbilityKey): Promise<boolean | undefined> {
	return await UseAbilitySignal.CallServerAsync(abilityKey);
}

/* Attributes */
async function ModifyAttribute(attributeKey: AttributeKey, amount: number): Promise<AttributesDTO | undefined> {
	print(`CallServer: ModifyAttribute(${attributeKey}, ${amount}) called.`);
	return await ModifyAttributeSignal.CallServerAsync(attributeKey, amount);
}

/* Settings */
function UpdateSetting(key: SettingKey, value: boolean | string): void {
	print(`CallServer: UpdateSetting(${key}, ${value}) called.`);
	UpdateSettingSignal.SendToServer(key, value);
}

/* Under development */
function SpawnWeapon(): void {
	print(`CallServer: SpawnWeapon called.`);
	const weapon = SpawnWeaponSignal.CallServerAsync();
}

export const ClientSend = {
	SetAbilities: SetAbilities,
	UseAbility: UseAbility,
	ModifyAttribute: ModifyAttribute,
	UpdateSetting: UpdateSetting,
	SpawnWeapon: SpawnWeapon,
};
