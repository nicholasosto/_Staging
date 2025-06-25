/// <reference types="@rbxts/types" />

/**
 * @file        IconButton.ts
 * @module      IconButton
 * @layer       Client/UI/Atoms
 * @description Simple icon button component.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 */

/* =============================================== Imports =============================================== */
import Fusion from "@rbxts/fusion";
import { ButtonSizes } from "client/ui/tokens";
import { GameImages, GameImageSubKey } from "shared/assets/image";
/* =============================================== Props =============================================== */

export interface IconButtonProps {
	Icon: string;
	Size?: UDim2;
	Position?: UDim2;
	AnchorPoint?: Vector2;
	OnClick?: () => void;
}

/* =============================================== IconButton Component =============================================== */
export const IconButton = (props: IconButtonProps) => {
	const { Icon, Size, Position, AnchorPoint, OnClick } = props;

	return Fusion.New("ImageButton")({
		Name: "IconButton",
		Image: GameImages[Icon as GameImageSubKey] ?? Icon,
		Size: Size ?? ButtonSizes.Icon(),
		Position: Position ?? UDim2.fromScale(0, 0),
		AnchorPoint: AnchorPoint ?? new Vector2(0.5, 0.5),
		BackgroundTransparency: 1,
		ImageColor3: new Color3(1, 1, 1),
		ImageTransparency: 0,
		[Fusion.OnEvent("Activated")]: () => {
			if (OnClick) {
				OnClick();
			} else {
				print("IconButton clicked, but no OnClick handler provided.");
			}
			return;
		},
	});
};
