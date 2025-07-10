/// <reference types="@rbxts/types" />

/**
 * @file        GeneticTypes.ts
 * @module      GeneticTypes
 * @layer       Shared/Genetics
 * @description Core genetic enums and type aliases.
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

// -----------------------------------------------------------------------------
export enum CodonKind {
	PART = "PART",
	FORCE = "FORCE",
	CONSTRAINT = "CONSTRAINT",
}

export interface Codon<T> {
	kind: CodonKind;
	value: T;
}

export type Chromosome = Codon<unknown>[];
