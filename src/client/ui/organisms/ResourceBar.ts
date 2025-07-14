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
import { BaseContainer, BorderImage, ListContainer } from "client/ui/atoms"; // absolute alias
import { ResourceKey, ResourceMeta } from "shared/definitions/Resources";
import { ProgressBar } from "client/ui/molecules";
import { ResourceState } from "client/states/ResourceSlice";
import Fusion, { Computed, Observer, OnChange } from "@rbxts/fusion";
import { PlayerStateInstance } from "client/states/PlayerState";

// -------------- Local helpers --------------------------------- //
function ResourceBar(resourceKey: ResourceKey, resourceState: ResourceState) {
	const state = resourceState;
	const meta = ResourceMeta[resourceKey];

	const resourceBar = ProgressBar({
		Name: `${resourceKey}_Bar`,
		Percent: state.percent,
		Label: Computed(
			() =>
				`${meta.displayName}: ${math.floor(state.percent.get() * 100)}% (${state.current.get()}/${state.max.get()})`,
		),
		Border: BorderImage.GothicMetal(),
		Gradient: meta.gradient,
		LayoutOrder: meta.layoutOrder,
		Size: new UDim2(1, 0, 0.31, 0),
		BackgroundTransparency: 1,
	});
	return resourceBar;
}

export const ResourceBars = (layoutOrder?: number) => {
	const slice = PlayerStateInstance.Resources;
	const resourceBars = ListContainer({
		Name: "ResourceBars",
		Size: new UDim2(1, 0, 1, 0),
		LayoutOrientation: "vertical",
		LayoutOrder: layoutOrder ?? 1,
		FlexMode: "Shrink",
		Gap: 1.5,
		Content: {
			HealthBar: ResourceBar("Health", slice.Health),
			ManaBar: ResourceBar("Mana", slice.Mana),
			StaminaBar: ResourceBar("Stamina", slice.Stamina),
		},
	});
	return resourceBars;
};
