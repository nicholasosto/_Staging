/// <reference types="@rbxts/types" />

/**
 * @file        AbilityServiceButton.ts
 * @module      AbilityServiceButton
 * @layer       Client/UI/Organisms
 * @description Button for invoking AbilityService test actions.
 */

import { GameButton } from "client/ui/atoms";
import { ActivateAbility } from "client/network/ClientNetworkService";

export const AbilityServiceButton = () =>
	GameButton({
		Name: "AbilityServiceButton",
		Size: new UDim2(0, 120, 0, 40),
		Image: "rbxassetid://8672979592",
		Label: "Use Fireball",
		OnClick: () => {
			ActivateAbility("fireball");
		},
	});
