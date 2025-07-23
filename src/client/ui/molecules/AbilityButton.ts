/**
 * @file AbilityButton.ts
 * @module AbilityButton
 * @layer Client/UI/Organisms
 * @description Contains buttons for various game events like spawning manifestations, increasing attributes, and creating gems
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author Trembus
 * @license MIT
 * @since 0.2.0
 * @lastUpdated 2025-06-25 by Trembus – Initial creation
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */
import { Computed, Children, New } from "@rbxts/fusion";

import { UIButton, GameImage, ListContainer, BaseContainer, BorderImage } from "client/ui/atoms";
import { ProgressBar } from "./ProgressBar";
import { ClientSend } from "client/network";
import { AbilityKey, AbilityCatalog, CooldownTimer, GameImages } from "shared";
import { Padding } from "../tokens";

export interface AbilityButtonProps {
	abilityKey: AbilityKey;
}

export function AbilityButton(abilityKey: AbilityKey): Frame {
	const meta = AbilityCatalog[abilityKey];
	//const remaining = Value(0); // counts down each frame

	/* Timer */
	const cooldownTimer = new CooldownTimer(meta.cooldown);

	const MysticalBackground = New("Folder")({
		Name: "MysticalBackground",
		[Children]: [
			New("ImageLabel")({
				Image: "rbxassetid://73987241775051", // Replace with actual mystical background image ID
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				ZIndex: -1, // Ensure it is behind the button
				[Children]: [
					New("UIStroke")({
						Color: Color3.fromRGB(255, 255, 255),
						Thickness: 5,
						ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
					}),
				],
			}),
		],
	});

	/* Cooldown Bar */
	const cooldownBar = ProgressBar({
		Size: new UDim2(1, 0, 0.3, 0), // Full width, fixed height
		Border: BorderImage.GothicMetal(),
		Percent: Computed(() => {
			const progress = cooldownTimer.Progress.get();
			return progress;
		}),
		Label: Computed(() => meta.displayName),
	});

	/* Image Button */
	const button = UIButton({
		Size: UDim2.fromOffset(64, 64),
		Image: GameImages.Ability.Background, // Background image for the button
		BackgroundTransparency: 1,
		[Children]: {
			/* Ability Icon */
			Icon: GameImage({
				Image: meta.iconId,
				Size: UDim2.fromScale(0.85, 0.85),
				AnchorPoint: new Vector2(0.5, 0.5),
				Position: UDim2.fromScale(0.5, 0.5),
				ZIndex: 1, // Ensure icon is above the background
			}),
		},
		OnClick: () => {
			ClientSend.UseAbility(abilityKey)
				.andThen((success) => {
					if (!success) {
						warn(`Failed to use ability: ${abilityKey}`);
					} else {
						cooldownTimer.start(); // Start the cooldown timer
					}
				})
				.catch((err) => {
					warn(`Error using ability ${abilityKey}: ${err}`);
				});
		},
	});

	// tick down timer using RunService or similar

	const listContainer = ListContainer({
		Size: UDim2.fromOffset(74, 90),
		LayoutOrientation: "vertical",
		BackgroundTransparency: 1,
		Content: {
			Background: MysticalBackground,
			ButtonIcon: button,
			CooldownBar: cooldownBar,
		},
	});

	return listContainer;
}
