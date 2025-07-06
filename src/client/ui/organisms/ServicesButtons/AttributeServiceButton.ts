/// <reference types="@rbxts/types" />

/**
 * @file        AttributeServiceButton.ts
 * @module      AttributeServiceButton
 * @layer       Client/UI/Organisms
 * @description Button for invoking AttributeService test actions.
 */

import { GameButton } from "client/ui/atoms";
import { IncreaseAttribute } from "client/network/ClientNetworkService";

export const AttributeServiceButton = () =>
	GameButton({
		Name: "AttributeServiceButton",
		Size: new UDim2(0, 120, 0, 40),
		Image: "rbxassetid://8672979592",
		Label: "Add STR",
		OnClick: () => {
			IncreaseAttribute("str", 1);
		},
	});
