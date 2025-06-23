/// <reference types="@rbxts/types" />

/**
 * @file        GameImage.ts
 * @module      GameImage
 * @layer       Client/Atom
 * @description Lightweight wrapper around `ImageLabel`.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-05-29 by Luminesa – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

/* =============================================== Imports ========================================= */
import Fusion, { New } from "@rbxts/fusion";
import { GameImages } from "shared/assets/image";

/* =============================================== Props ========================================= */
export interface GameImageProps extends Fusion.PropertyTable<ImageLabel> {
	Test?: boolean; // For testing purposes
}

/* =============================================== GameImage Component ========================================= */
export function GameImage(props: GameImageProps): ImageLabel {
	return New("ImageLabel")({
		Name: props.Name ?? "GameImage",
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		BackgroundTransparency: 1,
		Image: props.Image ?? "rbxassetid://121566852339881",
		Size: props.Size ?? UDim2.fromScale(1, 1),
		Position: props.Position ?? UDim2.fromScale(0.5, 0.5),
		ZIndex: props.ZIndex ?? 1,
		ScaleType: props.ScaleType ?? Enum.ScaleType.Fit,
		SliceCenter: props.SliceCenter ?? new Rect(0, 0, 0, 0),
		ImageRectOffset: props.ImageRectOffset ?? new Vector2(0, 0),
		ImageRectSize: props.ImageRectSize ?? new Vector2(0, 0),
	});
}

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
