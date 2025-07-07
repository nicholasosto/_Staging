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
import { RunService } from "@rbxts/services";
import { New, Value, OnChange, OnEvent, Computed, Children } from "@rbxts/fusion";
import { AbilityKey, AbilitiesMeta } from "shared/definitions";
import { GameButton, GamePanel, GameText, UIButton } from "client/ui/atoms";
import { Layout } from "client/ui/tokens";
import { BarMeter } from "client/ui/molecules/FillBar";
import { CooldownTimer } from "shared/classes/CooldownTimer";
import { GameImages } from "shared";
import { ActivateAbility } from "client/network/ClientNetworkService";

export interface AbilityButtonProps {
	abilityKey: AbilityKey;
	//onActivate: () => void;
}

export function AbilityButton(abilityKey: AbilityKey): Frame {
	const meta = AbilitiesMeta[abilityKey];
	const remaining = Value(0); // counts down each frame

	/* Timer */
	const cooldownTimer = new CooldownTimer(meta.cooldown);
	print(`Creating cooldown timer for ${meta.displayName} with duration ${meta.cooldown} seconds`);

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
			Icon: New("ImageLabel")({
				Size: UDim2.fromScale(0.8, 0.8),
				Position: UDim2.fromScale(0.1, 0.1),
				BackgroundTransparency: 1,
				Image: meta.iconId,
			}),
		},
		OnClick: () => {
			const activated = ActivateAbility(abilityKey);
			if (cooldownTimer.Progress.get() <= 0 && activated === true) {
				print(`Activated ability: ${abilityKey}`);
			}
		},
	});

	// tick down timer using RunService or similar

	return GamePanel({
		Size: UDim2.fromOffset(80, 90),
		Layout: Layout.VerticalSet(2),
		Content: {
			ButtonIcon: button,
			CooldownBar: cooldownBar,
		},
	});
}
