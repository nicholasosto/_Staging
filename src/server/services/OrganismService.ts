/// <reference types="@rbxts/types" />

/**
 * @file        OrganismService.ts
 * @module      OrganismService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Manages active EvolvingOrganisms and updates them.
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

import { RunService } from "@rbxts/services";
import { EvolvingOrganism } from "server/entity";

/**
 * Service controlling the lifecycle of all organisms.
 */
export class OrganismService {
	private static _instance: OrganismService | undefined;
	private readonly _organisms = new Set<EvolvingOrganism>();
	private _heartbeat?: RBXScriptConnection;

	private constructor() {
		this._heartbeat = RunService.Heartbeat.Connect((dt) => this._onHeartbeat(dt));
	}

	/**
	 * Starts the singleton instance.
	 */
	public static Start(): OrganismService {
		if (!this._instance) this._instance = new OrganismService();
		return this._instance;
	}

	/**
	 * Registers an organism for automatic updates.
	 * @param organism - Organism instance.
	 */
	public static Add(organism: EvolvingOrganism) {
		this.Start()._organisms.add(organism);
	}

	/**
	 * Removes an organism from updates.
	 * @param organism - Organism instance.
	 */
	public static Remove(organism: EvolvingOrganism) {
		this.Start()._organisms.delete(organism);
	}

	private _onHeartbeat(dt: number) {
		this._organisms.forEach((org) => org.update(dt));
	}
}

// Auto-start on import
OrganismService.Start();
