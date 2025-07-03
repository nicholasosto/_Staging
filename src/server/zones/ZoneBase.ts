import { Zone } from "@rbxts/zone-plus";
import { StatusEffectKey } from "shared/definitions/StatusEffect";
import { CollectionService } from "@rbxts/services";

export const currentHazardZones = CollectionService.GetTagged("ResourceHazard");

export const ZoneBase = (
	container: Instance,
	onPlayerEntered: (player: Player) => void,
	onPlayerExited: (player: Player) => void,
): Zone => {
        const zoneInstance = new Zone(container);
	zoneInstance.playerEntered.Connect(onPlayerEntered);
	zoneInstance.playerExited.Connect(onPlayerExited);
	return zoneInstance;
};

export const EffectZone = (
       container: Instance,
       effectKey: StatusEffectKey,
       OnPlayerEntered: (player: Player) => void,
       OnPlayerExited: (player: Player) => void,
) => {
       const zoneInstance = new Zone(container);
	zoneInstance.playerEntered.Connect(OnPlayerEntered);
	zoneInstance.playerExited.Connect(OnPlayerExited);
	return zoneInstance;
};
