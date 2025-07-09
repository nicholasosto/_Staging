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
import { BarMeter } from "../molecules/FillBar";
import { ResourceSlice } from "client/states";
import Fusion from "@rbxts/fusion";

// -------------- Local helpers --------------------------------------------- //
export function ResourceBar(resourceKey: ResourceKey, resourceState: ResourceState) {
	const state = resourceState;
	const meta = ResourceMeta[resourceKey];
	const { Spring, Computed } = Fusion;

	const progress = Computed(() => Spring(state.percent, 40, 1).get());

	const ProgressBarInstance = BarMeter({
		ProgressState: progress,
		Gradient: meta.gradient,
		Text: meta.displayName,
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
	const slice = ResourceSlice.getInstance();
	const resourceBars = ListContainer({
		Name: "ResourceBars",
		Size: new UDim2(1, 0, 1, 0),
		LayoutOrientation: "vertical",
		Content: {
			HealthBar: ResourceBar("Health", slice.Health),
			ManaBar: ResourceBar("Mana", slice.Mana),
			StaminaBar: ResourceBar("Stamina", slice.Stamina),
		},
	});
	return resourceBars;
};
