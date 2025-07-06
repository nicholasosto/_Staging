import { AnimationKey, GameImages, loadAnimation, playAnimation } from "shared";

import { GameButton, GamePanel } from "client/ui/atoms";
import { Players } from "@rbxts/services";

import Fusion from "@rbxts/fusion";
import { Layout } from "client/ui/tokens";
import container from "@rbxts/matter/lib/debugger/widgets/container";

/**
 * @file        PlayAnimationButton.ts
 * @module      PlayAnimationButton
 * @layer       Client/UI/Molecules
 * @description Button to play a specific animation on the player's character.
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-06 by Trembus – Initial creation
 *
 * @dependencies
 *  @rbxts/fusion ^0.4.0
 *
 * @description
 * This button plays a specific animation on the player's character when clicked.
 * The animation is defined by the AnimationKey.
 * */

export const PlayAnimationButton = (animationKey: AnimationKey) => {
	const player = Players.LocalPlayer;
	const character = player.Character || player.CharacterAdded.Wait()[0];

	return GameButton({
		Name: "PlayAnimationButton",
		Icon: GameImages.Ability.Blood_Elemental,
		Size: UDim2.fromOffset(50, 50),
		BackgroundColor3: Color3.fromRGB(100, 100, 255),
		OnClick: () => {
			if (character) {
				loadAnimation(character, animationKey);
				playAnimation(character, animationKey);
			}
		},
	});
};

export const AnimationButtons = () => {
	const animationKeys: AnimationKey[] = ["WhipAttack", "Dodge", "GodLike", "HallowHold", "WhipAttack"]; // Add more keys as needed

	const Container = GamePanel({
		Name: "AnimationButtonsContainer",
		Size: UDim2.fromScale(1, 0.2),
		BackgroundColor3: Color3.fromRGB(50, 50, 50),
		Layout: Layout.VerticalSet(),
		Content: animationKeys.map((key) => {
			return PlayAnimationButton(key);
		}),
	});
	return Container;
};
