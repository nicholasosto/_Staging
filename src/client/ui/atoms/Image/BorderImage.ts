import { GameImage } from "./GameImage";
import { GameImages } from "shared/assets/image";

/* =============================================== SliceImage ========================================= */
export interface SliceImageProps {
	Image: string;
	SliceCenter?: Rect;
	ZIndex?: number;
}

export const SliceImage = (props: SliceImageProps) => {
	return GameImage({
		Image: props.Image,
		ScaleType: Enum.ScaleType.Slice,
		SliceCenter: props.SliceCenter ?? new Rect(250, 250, 250, 250),
		ZIndex: props.ZIndex ?? 100,
	});
};

/* =============================================== Slice Constants ========================================= */

/* =============================================== BorderImage Component (9-Slice) ========================================= */
export const BorderImage = {
	GothicMetal: () =>
		SliceImage({
			Image: GameImages.Borders.GothicMetal,
		}),
	RedThick: () =>
		SliceImage({
			Image: GameImages.Borders.RedThick,
		}),
	CommonRarity: () =>
		SliceImage({
			Image: GameImages.Borders.CommonSet,
		}),
	RareRarity: () =>
		SliceImage({
			Image: GameImages.Borders.RareSet,
		}),
	EpicRarity: () =>
		SliceImage({
			Image: GameImages.Borders.EpicSet,
		}),
	LegendaryRarity: () =>
		SliceImage({
			Image: GameImages.Borders.LegendarySet,
		}),
};
