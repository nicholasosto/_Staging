import { Players } from "@rbxts/services";
import { AbilityKey, Network } from "shared";

/* Event Signals */
const ActivateAbilitySignal = Network.Client.Get("ActivateAbility");

/* Function Signals */
const GetPlayerAbilitiesSignal = Network.Client.Get("GetPlayerAbilities");

export async function GetPlayerAbilities(): Promise<AbilityKey[] | undefined> {
	return await GetPlayerAbilitiesSignal.CallServerAsync(Players.LocalPlayer);
}

export function ActivateAbility(abilityKey: AbilityKey): void {
	ActivateAbilitySignal.SendToServer(abilityKey);
}
