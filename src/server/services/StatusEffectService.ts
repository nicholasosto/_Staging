/// <reference types="@rbxts/types" />

/**
 * @file        StatusEffectService.ts
 * @module      StatusEffectService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Applies and tracks status effects on players.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-03 by Codex – Initial creation
 */

/* =============================================== Imports =============================================== */
import { StatusEffectMeta, StatusEffectKey } from "shared/definitions/StatusEffect";

/* =============================================== Service =============================================== */
export class StatusEffectService {
	private static _instance: StatusEffectService | undefined;
	private readonly _effects = new Map<Player, Map<StatusEffectKey, thread>>();

	private constructor() {
		print("StatusEffectService initialized.");
	}

	public static Start(): StatusEffectService {
		if (!this._instance) {
			this._instance = new StatusEffectService();
		}
		return this._instance;
	}

	/* ------------------------------- Public API ------------------------------- */
	public static AddEffect(player: Player, effectKey: StatusEffectKey) {
		const meta = StatusEffectMeta[effectKey];
		const svc = this.Start();
		let map = svc._effects.get(player);
		if (!map) {
			map = new Map<StatusEffectKey, thread>();
			svc._effects.set(player, map);
		}
		if (map.has(effectKey)) return;

		const runner = task.spawn(() => {
			while (map!.has(effectKey)) {
				print(`Applying ${effectKey} to ${player.Name}: ${meta.amount}`);
				task.wait(meta.tickRate);
			}
		});
		map.set(effectKey, runner);
	}

	public static RemoveEffect(player: Player, effectKey: StatusEffectKey) {
		const svc = this.Start();
		const map = svc._effects.get(player);
		if (!map) return;
		const th = map.get(effectKey);
		if (th) task.cancel(th);
		map.delete(effectKey);
	}

	public static ClearEffects(player: Player) {
		const svc = this.Start();
		const map = svc._effects.get(player);
		if (!map) return;
		map.forEach((th) => task.cancel(th));
		svc._effects.delete(player);
	}
}

// Auto-start on import
StatusEffectService.Start();
