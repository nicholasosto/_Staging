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
import { GameImages } from "shared";
import { AbilityKey, AbilitiesMeta } from "shared/definitions";

/*-- Atoms --*/
import { GameButton, GameImage, VerticalContainer } from "client/ui/atoms";

/*-- Molecules --*/
import { BarMeter } from "client/ui/molecules/FillBar";
import { CooldownTimer } from "shared/classes/CooldownTimer";

/*-- State Slice --*/
import { ClientSend } from "client/network";

export interface AbilityButtonProps {
	abilityKey: AbilityKey;
}

export function AbilityButton(abilityKey: AbilityKey): Frame {
	const meta = AbilitiesMeta[abilityKey];
	//const remaining = Value(0); // counts down each frame

	/* Timer */
	const cooldownTimer = new CooldownTimer(meta.cooldown);

	/* Cooldown Bar */
	const cooldownBar = BarMeter({
		Size: UDim2.fromOffset(64, 16),
		ProgressState: Computed(() => {
			const progress = cooldownTimer.Progress.get();
			return progress;
		}),
		Text: meta.displayName,
	});

	/* Image Button */
	const button = GameButton({
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

	return VerticalContainer({
		Size: UDim2.fromOffset(80, 90),
		//Layout: Layout.VerticalSet(2),
		Content: {
			ButtonIcon: button,
			CooldownBar: cooldownBar,
		},
	});
}
