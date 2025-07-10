/// <reference types="@rbxts/types" />

/**
 * @file        EvolvingOrganism.ts
 * @module      EvolvingOrganism
 * @layer       Server/Entity
 * @description Organism class driven by DNA chromosomes.
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

import { Chromosome } from "shared/genetics";
import { mutateChromosome } from "shared/genetics";
import { expressCodon } from "server/genetics";

/**
 * Runtime organism built from a chromosome definition.
 */
export class EvolvingOrganism {
	public readonly chromosome: Chromosome;
	public readonly model: Model;
	private _energy = 0;
	private _maxEnergy = 100;

	constructor(chromosome: Chromosome, maxEnergy = 100) {
		this.chromosome = chromosome;
		this.model = new Instance("Model");
		this._energy = maxEnergy;
		this._maxEnergy = maxEnergy;
	}

	/**
	 * Converts the organism's chromosome into Roblox instances.
	 * @param parent - Container to parent the resulting model to.
	 */
	public express(parent: Instance) {
		this.chromosome.forEach((codon) => {
			expressCodon(codon as never, this.model);
		});
		this.model.Parent = parent;
	}

	/**
	 * Updates energy and other time-based effects.
	 * @param dt - Delta time in seconds.
	 */
	public update(dt: number) {
		this._energy = math.clamp(this._energy - dt, 0, this._maxEnergy);
	}

	/**
	 * Generates a child chromosome with slight mutations.
	 * @returns Mutated chromosome copy.
	 */
	public reproduce(): Chromosome {
		return mutateChromosome(this.chromosome);
	}

	/**
	 * Energy remaining between 0 and 1.
	 */
	public getEnergyPercent(): number {
		return this._energy / this._maxEnergy;
	}

	/**
	 * Adds energy, clamped to the maximum.
	 * @param amount - Energy to add.
	 */
	public addEnergy(amount: number) {
		this._energy = math.clamp(this._energy + amount, 0, this._maxEnergy);
	}
}
