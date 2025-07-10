/**
 * @file        AbilityBar.ts
 * @module      AbilityBar
 * @layer       Client/UI/Organisms
 * @description Contains buttons for various game events like spawning manifestations, increasing attributes, and creating gems
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author Trembus
 * @license MIT
 * @since 0.2.0
 * @lastUpdated 2025-06-27 by Trembus – Initial creation
 * @dependencies
 *  @rbxts/fusion ^0.4.0
 * * @remarks
 *  This file defines the AbilityBar component, which displays a set of ability buttons for the player to interact with.
 *  Each button corresponds to an ability and includes a cooldown bar.
 *  The buttons are dynamically generated based on the abilities available to the player.
 *  The component uses Fusion for reactive UI updates and layout management.
 *  It is designed to be flexible and easily extendable for future abilities.
 *  The component is styled using the ListContainer atom for consistent UI appearance.
 *  The buttons are arranged horizontally with a set layout and spacing.
 *  The component is intended to be used within the player HUD screen, providing quick access to
 *  abilities during gameplay.
 */

import { Computed } from "@rbxts/fusion";
import { PlayerStateInstance } from "client/states/PlayerState";
import { ListContainer } from "client/ui/atoms";
import { AbilityButton } from "client/ui/molecules/AbilityButton";

export function AbilityBarComponent(): Frame {
	const abilitySlice = PlayerStateInstance.Abilities;
	const abilityBarComponent = ListContainer({
		Name: "AbilityBar",
		Size: new UDim2(0.5, 0, 0, 100),
		AnchorPoint: new Vector2(0.5, 1),
		Position: new UDim2(0.5, 0, 1, -10),
		BackgroundTransparency: 0.5,
		LayoutOrientation: "horizontal",
		Content: {
			Buttons: Computed(() => {
				const list = abilitySlice.Abilities.get();
				//warn(`AbilityBarComponent: Rendering ${list.size()} abilities`);
				return list.map((ability) => AbilityButton(ability));
			}),
		},
	});

	//warn("AbilityBarComponent: Created with", abilitySlice.Abilities.get().size(), "abilities");

	return abilityBarComponent;
}
