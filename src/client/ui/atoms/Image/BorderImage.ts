import { GameImage } from "./GameImage";
import { GameImages } from "shared/assets/image";

/* =============================================== BorderImage Component (9-Slice) ========================================= */
export const BorderImage = {
	GothicMetal: () =>
		GameImage({
			Image: GameImages.Borders.GothicMetal,
			ScaleType: Enum.ScaleType.Slice,
			SliceCenter: new Rect(150, 150, 360, 360),
			ZIndex: 100,
		}),
	RedThick: () =>
		GameImage({
			Image: GameImages.Borders.RedThick,
			ScaleType: Enum.ScaleType.Slice,
			SliceCenter: new Rect(500, 500, 500, 500),
			ImageRectOffset: new Vector2(30, 30),
			ImageRectSize: new Vector2(960, 960),
			ZIndex: 100,
		}),
	CommonRarity: () =>
		GameImage({
			Image: GameImages.Borders.CommonSet,
			ScaleType: Enum.ScaleType.Slice,
			SliceCenter: new Rect(150, 150, 360, 360),
			ZIndex: 100,
		}),
	RareRarity: () =>
		GameImage({
			Image: GameImages.Borders.RareSet,
			ScaleType: Enum.ScaleType.Slice,
			SliceCenter: new Rect(150, 150, 360, 360),
			ZIndex: 100,
		}),
	EpicRarity: () =>
		GameImage({
			Image: GameImages.Borders.EpicSet,
			ScaleType: Enum.ScaleType.Slice,
			SliceCenter: new Rect(150, 150, 360, 360),
			ZIndex: 100,
		}),
	LegendaryRarity: () =>
		GameImage({
			Image: GameImages.Borders.LegendarySet,
			ScaleType: Enum.ScaleType.Slice,
			SliceCenter: new Rect(150, 150, 360, 360),
			ZIndex: 100,
		}),
};
