import { CollectionService } from "@rbxts/services";
import { SSEntity } from "shared/types/SSEntity";

export type RigInfo = {
	rigId: string;
	rig: SSEntity;
	distance: number;
	team?: string;
};

export namespace SSEntityHelper {
	/** Returns every rig inside radius. Falls back to registry scan if Octree absent. */
	export function getRigsInRadius(origin: CFrame, radius: number): RigInfo[] {
		warn(`Getting rigs in radius ${radius} from ${origin.Position}`);
		const ssEntities = CollectionService.GetTagged("SSEntity") as SSEntity[];
		return ssEntities.reduce<RigInfo[]>((acc, rig) => {
			if ((rig as SSEntity) === undefined) {
				return acc;
			}
			const rigPosition = rig.GetPivot().Position;
			const distance = rigPosition.sub(origin.Position).Magnitude;
			if (distance <= radius) {
				acc.push({ rigId: rig.GetFullName(), rig, distance });
			}
			return acc;
		}, []);
	}

	export function getClosestRig(playerCharacter: SSEntity, origin: CFrame, radius = math.huge): RigInfo | undefined {
		let bestRig: RigInfo | undefined = undefined;
		let bestDist = radius;

		const rigs = getRigsInRadius(origin, radius);
		rigs.forEach((rig) => {
			if (rig.distance < bestDist) {
				bestDist = rig.distance;
				bestRig = rig;
			}
		});
		return bestRig;
	}
}
