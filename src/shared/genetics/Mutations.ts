/// <reference types="@rbxts/types" />

/**
 * @file        Mutations.ts
 * @module      GeneticMutations
 * @layer       Shared/Genetics
 * @description Utility functions for mutating chromosomes.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-09 by Codex – initial creation
 */

import { Chromosome, Codon, CodonKind } from "./GeneticTypes";

/** Random Color3 within 0-255 per channel. */
export function randomColor(): Color3 {
	return Color3.fromRGB(math.random(0, 255), math.random(0, 255), math.random(0, 255));
}

/**
 * Returns a random Vector3 with each component in the provided range.
 * @param min - Minimum value inclusive.
 * @param max - Maximum value inclusive.
 */
export function randomVectorWithin(min: number, max: number): Vector3 {
	return new Vector3(
		math.random() * (max - min) + min,
		math.random() * (max - min) + min,
		math.random() * (max - min) + min,
	);
}

/**
 * Generates a random codon placeholder.
 */
export function randomCodon(): Codon<{ size: Vector3; color: Color3 }> {
	return {
		kind: CodonKind.PART,
		value: {
			size: randomVectorWithin(1, 4),
			color: randomColor(),
		},
	};
}

/**
 * Mutates the provided chromosome by slightly altering one codon.
 * @param chromosome - Source chromosome.
 * @returns A new mutated chromosome.
 */
export function mutateChromosome(chromosome: Chromosome): Chromosome {
	const clone = chromosome.map((c) => ({ ...c }));
	if (clone.size() === 0) return clone;
	const index = math.random(0, clone.size() - 1);
	const codon = clone[index];
	if (codon.kind === CodonKind.PART && typeIs(codon.value, "table")) {
		const val = codon.value as { size?: Vector3; color?: Color3 };
		if (val.size) {
			val.size = val.size.add(randomVectorWithin(-0.5, 0.5));
		}
		if (val.color) {
			val.color = randomColor();
		}
	}
	return clone;
}
