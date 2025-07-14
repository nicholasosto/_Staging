/// <reference types="@rbxts/types" />

/**
 * @file        CombatService.ts
 * @module      CombatService
 * @layer       Server/Services
 * @description Tracks combat interactions and awards kill credit.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 */

import Signal from "@rbxts/signal";
import { SSEntity } from "shared/types/SSEntity";
import { DamageBucket, ContributionEntry, decayScore, qualifiesForKill } from "shared/combat";

interface EntityState {
	total: number;
	contributions: Map<SSEntity, ContributionEntry>;
	diedConn?: RBXScriptConnection;
}

interface DeathSummary {
	killer?: SSEntity;
	victim: SSEntity;
}

/** Server-authoritative combat bookkeeping. */
export class CombatService {
	private static _instance: CombatService | undefined;
	private readonly _entities = new Map<SSEntity, EntityState>();
	private readonly _deathSignal = new Signal<(summary: DeathSummary) => void>();

	private readonly halfLifeMs = 5000;
	private readonly minShare = 0.25;

	private constructor() {}

	/** Initialise internal tables and ensure singleton instance. */
	public static Start(): CombatService {
		if (!this._instance) {
			this._instance = new CombatService();
		}
		return this._instance;
	}

	/** Subscribe to death events summarised by the service. */
	public static onDeath(cb: (summary: DeathSummary) => void) {
		return this.Start()._deathSignal.Connect(cb);
	}

	/** Register an entity once it enters the world. */
	public static RegisterEntity(entity: SSEntity): void {
		const svc = this.Start();
		if (svc._entities.has(entity)) return;

		const state: EntityState = { total: 0, contributions: new Map() };
		svc._entities.set(entity, state);

		const humanoid = entity.Humanoid;
		state.diedConn = humanoid.Died.Connect(() => svc.handleDeath(entity));
	}

	/** Record a combat interaction. */
	public static CombatEvent(attacker: SSEntity, defender: SSEntity, bucket: DamageBucket): void {
		const svc = this.Start();
		const state = svc._entities.get(defender);
		if (!state) return;

		state.total += bucket.amount;
		const now = bucket.timestamp;
		const entry = state.contributions.get(attacker) || { amount: 0, lastHit: now };
		entry.amount += bucket.amount;
		entry.lastHit = now;
		state.contributions.set(attacker, entry);
	}

	private handleDeath(defender: SSEntity) {
		const state = this._entities.get(defender);
		if (!state) return;
		const now = os.clock() * 1000;

		let topKiller: SSEntity | undefined;
		let topScore = 0;
		let total = 0;

		state.contributions.forEach((entry) => {
			total += decayScore(entry, now, this.halfLifeMs);
		});

		state.contributions.forEach((entry, attacker) => {
			const score = decayScore(entry, now, this.halfLifeMs);
			if (score > topScore && qualifiesForKill(score, total, this.minShare)) {
				topScore = score;
				topKiller = attacker;
			}
		});

		this._deathSignal.Fire({ killer: topKiller, victim: defender });
		state.diedConn?.Disconnect();
		this._entities.delete(defender);
	}
}
