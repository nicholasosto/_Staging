/// <reference types="@rbxts/types" />

/**
 * @file        AnimationHelper.ts
 * @module      AnimationHelper
 * @layer       Server/Entity
 * @description Utility for loading ability animations on characters.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 */

import { AbilityKey, AbilitiesMeta } from "shared/definitions";
import { loadAnimation } from "shared/definitions/Animation";

// Entity Helpers
export function LoadAbilityAnimations(character: Model, abilities: AbilityKey[]) {
	if (character === undefined) {
		warn(`Character model is undefined.`);
		return;
	}
	abilities.forEach((abilityKey) => {
		print(`Loading animation for ability: ${abilityKey}`);
		loadAnimation(character, AbilitiesMeta[abilityKey]?.animationKey);
	});
}
