import { Workspace } from "@rbxts/services";

/**
 * @file        AlienBob.ts
 * @module      AlienBob
 * @layer       Server/Entity
 * @description Represents the Alien Bob NPC entity.
 */

export const MUTATION_KEYS = ["ColorChange", "SizeChange", "SpeedBoost", "HealthBoost", "EnergyBoost"] as const;
export class AlienBob {
	private static _instance: AlienBob | undefined;
	public static BobOrganism: Model | undefined;

	private constructor() {
		print("AlienBob initialized.");
	}

	public static Start(): AlienBob {
		if (this._instance === undefined) {
			this._instance = new AlienBob();
			this._initialize();
		}
		return this._instance;
	}

	private static _initialize() {
		const alienBob = Workspace.FindFirstChild("Alien_Bob");
		if (alienBob && alienBob.IsA("Model")) {
			print("Alien Bob NPC found in the workspace.");
			this.BobOrganism = alienBob;
		} else {
			warn("Alien Bob NPC not found in the workspace.");
		}
	}

	public static MutateBob() {
		if (this.BobOrganism) {
			const randomnumber = math.random(1, 10);
		}
	}
}
