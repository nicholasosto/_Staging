/**
 * @file ResourceCalculator.ts
 * @module ResourceCalculator
 * @author Trembus
 * @layer Shared/Calculations
 * @description Contains utility functions for calculating resource values like health, mana, and stamina based on attributes.
 */

import { AttributesDTO, ResourceKey } from "shared/definitions";
// formulas/ResourceFormula.ts
export type FormulaFn = (attrs: AttributesDTO, level: number) => number;

export const ResourceFormula: Record<ResourceKey, FormulaFn> = {
	Health: (a, lvl) => 50 + a.str * 10 + lvl * 5,
	Mana: (a, lvl) => 30 + a.int * 12,
	Stamina: (a, lvl) => 40 + a.agi * 8 + lvl * 2,
};
