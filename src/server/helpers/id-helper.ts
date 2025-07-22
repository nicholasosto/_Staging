import { HttpService, Players } from "@rbxts/services";

export const GameInstanceMap = new Map<string, Instance>();
export const SSID_ATTRIBUTE_NAME = "ssId" as const;

export function GetInstanceById(id: string): unknown | undefined {
	return GameInstanceMap.get(id);
}

export function RegisterInstance(instance: Instance): [string, Instance] | undefined {
	const character = instance as Model;
	const player = Players.GetPlayerFromCharacter(character);
	const currentId = instance.GetAttribute(SSID_ATTRIBUTE_NAME) as string | undefined;
	if (currentId !== undefined && GameInstanceMap.get(currentId) === instance) {
		warn(`Instance ${instance.GetFullName()} already registered with ID ${currentId}`);
		return [currentId, instance];
	}
	const newId = HttpService.GenerateGUID(false);
	if (currentId !== undefined) {
		GameInstanceMap.delete(currentId);
	}
	instance.SetAttribute(SSID_ATTRIBUTE_NAME, newId);
	GameInstanceMap.set(newId, instance);
	warn(`Registered instance ${instance.GetFullName()} with ID ${newId}`);
	return [newId, instance];
}
