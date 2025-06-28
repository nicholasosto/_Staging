/// <reference types="@rbxts/types" />

/**
 * @file        HUDMenuButton.ts
 * @module      HUDMenuButton
 * @layer       Client/UI/Molecules/Button
 * @description Toggle button used in the HUD menu bar to show or hide screens.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @since        0.2.1
 * @lastUpdated  2025-07-05 by Codex – Documentation cleanup
 */

import Fusion, { Children, Computed, New, OnEvent, Value } from "@rbxts/fusion";
import { GameImage } from "client/ui/atoms";
import { GameImages, MenuButtonImageMap } from "shared";
import { ScreenKey, ShowScreen, ScreenState } from "client/states";

export interface HUDMenuButtonProps extends Fusion.PropertyTable<ImageButton> {
	/** Which screen this button toggles. */
	ScreenKey: ScreenKey;
}

/* =============================== HUDMenuButton Component ====================== */
export const HUDMenuButton = (props: HUDMenuButtonProps) => {
	const SelectedState = ScreenState[props.ScreenKey] ?? Value(false);
	const Hovered = Value(false);

	const computedBGColor = Computed(() => {
		if (SelectedState.get()) {
			return new Color3(0.75, 0.29, 0.29);
		} else if (Hovered.get()) {
			return new Color3(0.87, 0.94, 0.53);
		}
		return new Color3(0.08, 0.04, 0.04);
	});

	const button = New("ImageButton")({
		Name: props.Name ?? "ToggleMenuButton",
		Size: props.Size ?? UDim2.fromOffset(50, 50),
		Image: GameImages.MenuButtonImage,
		BackgroundColor3: computedBGColor,
		[OnEvent("MouseEnter")]: () => Hovered.set(true),
		[OnEvent("MouseLeave")]: () => Hovered.set(false),
		[OnEvent("Activated")]: () => {
			SelectedState.set(!SelectedState.get());
			if (SelectedState.get()) {
				ShowScreen(props.ScreenKey);
			} else {
				ScreenState[props.ScreenKey].set(false);
			}
		},

		[Children]: {
			ButtonIcon: GameImage({
				Name: "SoulForgeIcon",
				Image: MenuButtonImageMap[props.ScreenKey] ?? GameImages.MenuButtonImage,
				Size: UDim2.fromScale(0.8, 0.8),
				BackgroundTransparency: 1,
				Position: UDim2.fromScale(0.5, 0.5),
				AnchorPoint: new Vector2(0.5, 0.5),
				ImageColor3: new Color3(1, 1, 1), // White
			}),
		},
	});
	return button;
};
