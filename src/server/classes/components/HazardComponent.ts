/// <reference types="@rbxts/types" />

/**
 * @file        HazardComponent.ts
 * @module      HazardComponent
 * @layer       Server/Classes/Components
 * @description Matter component representing damaging hazards.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @since        0.2.0
 * @lastUpdated  2025-06-27 by Trembus – Initial creation
 */

import { component, Component } from "@rbxts/matter";

const testComponent = component("HazardComponent", {
	// Define the properties of the HazardComponent
	// For example, you might want to track damage, visual effects, etc.
	damage: 0, // Amount of damage this hazard applies
	duration: 0, // Duration of the hazard effect
	visualEffect: undefined as Instance | undefined, // Optional visual effect instance
});
