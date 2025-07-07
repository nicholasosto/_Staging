/// <reference types="@rbxts/types" />

/**
 * @file        AdminButtonBar.ts
 * @module      AdminButtonBar
 * @layer       Client/UI/Organisms
 * @description Horizontal bar of service test buttons for administrators.
 */

import { GamePanel, HorizontalContainer } from "client/ui/atoms";
import { Layout } from "client/ui/tokens";
import { AttributeServiceButton, ProgressionServiceButton, AbilityServiceButton } from "../ServicesButtons";
import { SpawnWeaponButton } from "../ServicesButtons/SpawnWeaponButton";

export const AdminButtonBar = () => {
	const Component = HorizontalContainer({
		Name: "AdminButtonBar",
		Size: UDim2.fromOffset(380, 50),
		BackgroundTransparency: 0.5,
		Gap: 5,
		Content: {
			Attribute: AttributeServiceButton(),
			Progression: ProgressionServiceButton(),
			Ability: AbilityServiceButton(),
			SpawnWeapon: SpawnWeaponButton(),
		},
	});
	return Component;
};
