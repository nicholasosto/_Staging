/** Hazard Component
 * This component handles the hazard logic for the game, including damage application and visual effects.
 * It is responsible for managing the state of hazards, applying damage to players, and triggering visual effects.
 *
 * @file        HazardComponent.ts
 * @module      HazardComponent
 * @layer       Server/Classes/Components
 * @description Handles hazard logic, including damage application and visual effects.
 * * ╭───────────────────────────────╮
 * * │  Soul Steel · Coding Guide    │
 * * │  Fusion v4 · Strict TS · ECS  │
 * * ╰───────────────────────────────╯
 * * @author Trembus
 * * @license MIT
 * * @since 0.2.0
 * * @lastUpdated 2025-06-27 by Trembus – Initial creation
 * * @dependencies
 * *  @rbxts/fusion ^0.4.0
 * *  @rbxts/services ^0.4.0
 *
 */

import { component, Component } from "@rbxts/matter";

const testComponent = component("HazardComponent", {
	// Define the properties of the HazardComponent
	// For example, you might want to track damage, visual effects, etc.
	damage: 0, // Amount of damage this hazard applies
	duration: 0, // Duration of the hazard effect
	visualEffect: undefined as Instance | undefined, // Optional visual effect instance
});
