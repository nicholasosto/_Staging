/// <reference types="@rbxts/types" />

/**
 * @file        ResourceCalculator.ts
 * @module      ResourceCalculator
 * @layer       Shared/Calculations
 * @description Utility formulas for computing max resource values.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { AttributesDTO, ResourceKey } from "shared/definitions";
// formulas/ResourceFormula.ts
export type FormulaFn = (attrs: AttributesDTO, level: number) => number;

export const ResourceFormula: Record<ResourceKey, FormulaFn> = {
	Health: (a, lvl) => 50 + a.str * 10 + lvl * 5,
	Mana: (a, lvl) => 30 + a.int * 12,
	Stamina: (a, lvl) => 40 + a.agi * 8 + lvl * 2,
};
