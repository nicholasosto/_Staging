import { HttpService } from "@rbxts/services";

export const GameInstanceMap = new Map<string, Instance>();

export function GetInstanceById(id: string): unknown | undefined {
	return GameInstanceMap.get(id);
}

export function RegisterInstance(instance: Instance): [string, Instance] | undefined {
	if (instance === undefined || instance.SetAttribute === undefined) {
		warn(`Attempted to register an invalid instance: ${instance}`);
		return;
	}
	const id = HttpService.GenerateGUID(false);

	GameInstanceMap.set(id, instance);
	if (GameInstanceMap.has(id)) {
		instance.SetAttribute("Id", id);
	}
	return [id, instance];
}
