/// <reference types="@rbxts/types" />

/**
 * @file        ResourceBars.ts                     ◄────── must match filename
 * @module      ResourceBars                        ◄────── public import name
 * @layer       Client/Organisms
 * @description Composite organism that shows the
 *              player's Health, Mana & Stamina.
 *
 * ╭───────────────────────────────────────────────╮
 * │  Soul Steel · Coding Guide                   │
 * │  Fusion v4 · Strict TS · ECS                 │
 * ╰───────────────────────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-06-25 by Luminesa – Comment revamp
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

// -------------- Imports ----------------------------------------------------- //
import { BaseContainer, ListContainer } from "client/ui/atoms"; // absolute alias
import { ResourceKey, ResourceMeta, ResourceState } from "shared/definitions/Resources";
import { ProgressBar } from "../molecules";
import { ResourceSlice } from "client/states";

// -------------- Local helpers --------------------------------------------- //
export function ResourceBar(resourceKey: ResourceKey, resourceState: ResourceState) {
	const state = resourceState;
	const meta = ResourceMeta[resourceKey];

	/* ProgressBar Instance */
	const ProgressBarInstance = ProgressBar({
		Name: `${resourceKey}_ProgressBar`,
		Progress: state.percent,
		GradientColor: meta.gradient,
		Size: UDim2.fromScale(1, 1),
		Label: meta.displayName,
	});

	const resourceBarContainer = BaseContainer({
		Name: `${resourceKey}_BarContainer`,
		Size: UDim2.fromScale(1, 0.3),
		LayoutOrder: meta.layoutOrder,
		Content: {
			ProgressBar: ProgressBarInstance,
		},
	});
	return resourceBarContainer;
}

export const ResourceBars = () => {
	const size = new UDim2(1, 0, 0, 100);
	const healthBar = ProgressBar({
		Label: "Health",
		GradientColor: ResourceMeta.Health.gradient,
		Progress: ResourceSlice.getInstance().Health.percent,
		Size: size,
	});
	const manaBar = ProgressBar({
		Label: "Mana",
		GradientColor: ResourceMeta.Mana.gradient,
		Progress: ResourceSlice.getInstance().Mana.percent,
		Size: size,
	});
	const staminaBar = ProgressBar({
		Label: "Stamina",
		GradientColor: ResourceMeta.Stamina.gradient,
		Progress: ResourceSlice.getInstance().Stamina.percent,
		Size: size,
	});
	const resourceBars = ListContainer({
		Name: "ResourceBars",
		Size: new UDim2(1, 0, 1, 0),
		LayoutOrientation: "vertical",
		Content: {
			HealthBar: healthBar,
			ManaBar: manaBar,
			StaminaBar: staminaBar,
		},
	});
	return resourceBars;
};
