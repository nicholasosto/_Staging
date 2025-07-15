/**
 * @file src/server/services/BeamService.ts
 * @module BeamService
 * @layer Server/Services
 * @description Manages beam effects for the game on the server side.
 * @author Trembus
 * @license MIT
 * @since 0.1.0
 * @lastUpdated 2025-07-15
 * @remarks
 * This service is responsible for handling all effects in the game, including
 * particle effects, sound effects, and any other visual or auditory feedback
 * that needs to be displayed to the player.
 */

import { SSEntity } from "shared";
import { BeamKey } from "shared/definitions/Beams";
import { BeamFactory, BeamFactoryService } from "shared/factory";

export class BeamService {
	private static _instance: BeamService | undefined;
	private static _debug: boolean;

	private constructor(debug: boolean) {
		if (debug) {
			print(`EffectsService started`);
		}
	}

	public static Start(debug = false): BeamService {
		if (this._instance === undefined) {
			this._instance = new BeamService(debug);
		}
		if (debug !== undefined) {
			this._debug = debug;
		}
		return this._instance;
	}

	public static BeamBetween(beamKey: BeamKey, sourceEntity: SSEntity, targetEntity: SSEntity): void {
		if (this._debug) {
			print(`BeamBetween called: ${sourceEntity.Name} -> ${targetEntity.Name} with beamKey: ${beamKey}`);
		}
		// Logic to create a beam effect between sourceEntity and targetEntity
		// This would typically involve creating a Beam instance and setting its properties
		const beam = BeamFactoryService.createBeam(beamKey, sourceEntity, targetEntity);
		print("THE BEAM: ", beam);
	}

	public static Destroy(): void {
		this._instance = undefined;
	}

	// Add methods for creating and managing effects here
}
