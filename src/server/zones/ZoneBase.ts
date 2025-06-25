import container from "@rbxts/matter/lib/debugger/widgets/container";
import { Zone } from "@rbxts/zone-plus";

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
