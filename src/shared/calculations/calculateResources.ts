/// <reference types="@rbxts/types" />

/**
 * @file        calculateResources.ts
 * @module      CalculateResources
 * @layer       Shared/Calculations
 * @description Computes derived resource values from attributes and level.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.3.0
 *
 * @dependencies
 *   shared/definitions
 */

import { AttributesDTO } from "shared/definitions/ProfileDefinitions/Attributes";
import { RESOURCE_KEYS, ResourceDataMap, ResourceKey, ResourceDTO } from "shared/definitions/Resources";
import { ResourceFormula } from "./ResourceCalculator";

/**
 * Calculate a full resource snapshot using attribute-based formulas.
 *
 * @param attrs - Current character attributes.
 * @param level - Character level influencing scaling.
 * @param previous - Optional previous values used to clamp current amounts.
 * @returns A new map of resources with clamped current and recomputed max.
 *
 * @example
 * ```ts
 * const resources = calculateResources(DefaultAttributes, 1);
 * print(resources.Health.max); // 60
 * ```
 */
export function calculateResources(
	attrs: AttributesDTO,
	level: number,
	previous?: Partial<ResourceDataMap>,
): ResourceDataMap {
	const result = {} as ResourceDataMap;
	for (const key of RESOURCE_KEYS) {
		const prev = previous?.[key];
		const max = ResourceFormula[key](attrs, level);
		const current = prev ? math.clamp(prev.current, 0, max) : max;
		const regen = prev?.regenPerSecond;
		result[key] = { current, max, regenPerSecond: regen } as ResourceDTO;
	}
	return result;
}
