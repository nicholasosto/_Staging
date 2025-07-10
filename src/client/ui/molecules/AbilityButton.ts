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
import { Computed, Children } from "@rbxts/fusion";

import { UIButton, GameImage, ListContainer } from "client/ui/atoms";
import { ProgressBar } from "./ProgressBar";
import { ClientSend } from "client/network";
import { AbilityKey, AbilitiesMeta, CooldownTimer, GameImages } from "shared";

export interface AbilityButtonProps {
	abilityKey: AbilityKey;
}

export function AbilityButton(abilityKey: AbilityKey): Frame {
	const meta = AbilitiesMeta[abilityKey];
	//const remaining = Value(0); // counts down each frame

	/* Timer */
	const cooldownTimer = new CooldownTimer(meta.cooldown);

	/* Cooldown Bar */
	const cooldownBar = ProgressBar({
		Size: UDim2.fromOffset(64, 16),
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
				Size: UDim2.fromScale(0.6, 0.6),
			}),
		},
		OnClick: () => {
			if (cooldownTimer.Progress.get() <= 0) {
				ClientSend.UseAbility(abilityKey);
				cooldownTimer.start();
			}
		},
	});

	// tick down timer using RunService or similar

	return ListContainer({
		Size: UDim2.fromOffset(80, 90),
		LayoutOrientation: "vertical",
		Content: {
			ButtonIcon: button,
			CooldownBar: cooldownBar,
		},
	});
}
