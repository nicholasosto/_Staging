/// <reference types="@rbxts/types" />

/**
 * @file        ProgressionServiceButton.ts
 * @module      ProgressionServiceButton
 * @layer       Client/UI/Organisms
 * @description Button for invoking ProgressionService test actions.
 */

import { GameButton, GameImage } from "client/ui/atoms";
import { AddExperience } from "client/network/ClientNetworkService";
import { GameImages } from "shared";

export const ProgressionServiceButton = () =>
	GameButton({
		Name: "ProgressionServiceButton",
		Size: new UDim2(0, 6, 0, 60),
		Image: GameImages.Ability.Blood_Horror,
		Label: "+10 XP",
		OnClick: () => {
			AddExperience(10);
		},
	});
