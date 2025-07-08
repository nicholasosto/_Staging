import { Zone } from "@rbxts/zone-plus";
import { CollectionService } from "@rbxts/services";

export const currentHazardZones = CollectionService.GetTagged("ResourceHazard");

export interface ZoneInterface {
	container: Instance;
	onPlayerEntered: (player: Player) => void;
	onPlayerExited: (player: Player) => void;
}

export const ZoneBase = (props: ZoneInterface): Zone => {
	const zoneInstance = new Zone(props.container);
	zoneInstance.playerEntered.Connect(props.onPlayerEntered);
	zoneInstance.playerExited.Connect(props.onPlayerExited);
	return zoneInstance;
};
