/// <reference types="@rbxts/types" />

/**
 * @file        AdminButtonBar.ts
 * @module      AdminButtonBar
 * @layer       Client/UI/Organisms
 * @description Horizontal bar of service test buttons for administrators.
 */

import { GamePanel } from "client/ui/atoms";
import { Layout } from "client/ui/tokens";
import { AttributeServiceButton, ProgressionServiceButton, AbilityServiceButton } from "../ServicesButtons";
import { SpawnWeaponButton } from "../ServicesButtons/SpawnWeaponButton";

export const AdminButtonBar = () =>
	GamePanel({
		Name: "AdminButtonBar",
		Size: UDim2.fromOffset(380, 50),
		BackgroundTransparency: 0.5,
		Layout: Layout.HorizontalSet(5),
		Content: {
			Attribute: AttributeServiceButton(),
			Progression: ProgressionServiceButton(),
			Ability: AbilityServiceButton(),
			SpawnWeapon: SpawnWeaponButton(),
		},
	});
