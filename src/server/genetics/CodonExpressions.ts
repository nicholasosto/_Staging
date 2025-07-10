/// <reference types="@rbxts/types" />

/**
 * @file        CodonExpressions.ts
 * @module      CodonExpressions
 * @layer       Server/Genetics
 * @description Maps codons to Roblox instances.
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

import { Codon, CodonKind } from "shared/genetics";

/**
 * Creates a Roblox instance from a codon description.
 * @param codon - Codon to express.
 * @param parent - Parent container for the created instance.
 * @returns Created instance or undefined.
 */
export function expressCodon<T>(codon: Codon<T>, parent: Instance): Instance | undefined {
	switch (codon.kind) {
		case CodonKind.PART: {
			const part = new Instance("Part");
			const value = codon.value as unknown as { size?: Vector3; color?: Color3; cframe?: CFrame };
			if (value.size) part.Size = value.size;
			if (value.color) part.Color = value.color;
			if (value.cframe) part.CFrame = value.cframe;
			part.Parent = parent;
			return part;
		}
		case CodonKind.FORCE:
			// TODO: apply physics forces based on codon
			// See Documents/OrganismStructure.md for planned organism patterns.
			return undefined;
		case CodonKind.CONSTRAINT:
			// TODO: apply constraints to parts when implemented
			return undefined;
	}
}
