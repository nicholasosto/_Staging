import { Players } from "@rbxts/services";
import { AbilityKey, Network } from "shared";

/* Function Signals */
const GetPlayerAbilitiesSignal = Network.Client.Get("GetPlayerAbilities");

export async function GetPlayerAbilities(): Promise<AbilityKey[] | undefined> {
	return await GetPlayerAbilitiesSignal.CallServerAsync(Players.LocalPlayer);
}
