/// <reference types="@rbxts/types" />

/**
 * @file        HUDMenuButton.ts
 * @module      HUDMenuButton
 * @layer       Client/UI/Organisms
 * @description Toggle button used in the HUD menu bar to show or hide screens.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @since        0.2.1
 * @lastUpdated  2025-07-10 by Codex – Exposed state colours
 */

import Fusion, { Children, Computed, New, OnEvent, Value } from "@rbxts/fusion";
import { useToken } from "theme/hooks";
import { GameImage, UIButton } from "client/ui/atoms";
import { GameImages, MenuButtonImageMap } from "shared";
import { ScreenKey, ShowScreen, ScreenState } from "client/states";

export interface HUDMenuButtonProps extends Fusion.PropertyTable<ImageButton> {
        /** Which screen this button toggles. */
        ScreenKey: ScreenKey;
        DefaultColour?: Color3 | Fusion.Computed<Color3>;
        HoverColour?: Color3 | Fusion.Computed<Color3>;
        SelectedColour?: Color3 | Fusion.Computed<Color3>;
}

/* =============================== HUDMenuButton Component ====================== */
export const HUDMenuButton = (props: HUDMenuButtonProps) => {
        const SelectedState = ScreenState[props.ScreenKey] ?? Value(false);
        const Hovered = Value(false);

        const toComputed = (colour: Color3 | Fusion.Computed<Color3> | undefined, fallback: Fusion.Computed<Color3>): Fusion.Computed<Color3> => {
                if (colour === undefined) return fallback;
                return typeIs(colour, "Color3") ? Computed(() => colour) : (colour as Fusion.Computed<Color3>);
        };

        const defaultColor = toComputed(props.DefaultColour, useToken("panelBg"));
        const hoverColor = toComputed(props.HoverColour, useToken("panelBgHover"));
        const selectedColor = toComputed(props.SelectedColour, useToken("panelBorder"));

        const computedBGColor = Computed(() => {
                if (SelectedState.get()) {
                        return selectedColor.get();
                } else if (Hovered.get()) {
                        return hoverColor.get();
                }
                return defaultColor.get();
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
                                ImageColor3: props.ImageColor3 ?? new Color3(1, 1, 1),
			}),
		},
	});
	return button;
};
