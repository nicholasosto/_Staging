/// <reference types="@rbxts/types" />

/**
 * @file        GameButton.ts
 * @module      GameButton
 * @layer       Client/UI/Atoms
 * @description Simple button component built from `GamePanel` and `GameImage`.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Luminesa – Added documentation header
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Children, OnEvent, PropertyTable } from "@rbxts/fusion";
import { GamePanel } from "../Container";
import { GameImage } from "../Image";
import { useToken } from "theme/hooks";

export interface GameButtonProps extends PropertyTable<ImageButton> {
	OnClick?: () => void;
	Selected?: boolean;
}

export function GameButton(props: GameButtonProps) {
        const SelectedState = Fusion.Value<boolean>(props.Selected ?? false);
        const bg = useToken("panelBg");
        return GamePanel({
                Name: props.Name,
                Size: props.Size ?? UDim2.fromOffset(100, 50),
                BackgroundColor3: bg,
                BorderSizePixel: 0,
		Children: {
			ButtonImage: Fusion.New("ImageButton")({
				Name: "ButtonImage",
				ImageTransparency: 1,
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				[OnEvent("Activated")]: () => {
					props.OnClick?.();
				},
				[Children]: {
					Image: GameImage({
						Name: "ButtonImage",
						RatioConstraint: 1,
						Image: props.Image ?? "rbxassetid://121566852339881",
					}),
				},
			}),
		},
	});
}
