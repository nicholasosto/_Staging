/// <reference types="@rbxts/types" />

/**
 * @file        ResourcesService.ts
 * @module      ResourcesService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Tracks player resources like Health, Mana and Stamina.
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

/* =============================================== Imports ===================== */
import { Players, RunService } from "@rbxts/services";
import { ResourceKey, ResourceDTO, RESOURCE_KEYS, DEFAULT_RESOURCES } from "shared/definitions/Resources";
import { DefaultAttributes, AttributesDTO } from "shared/definitions/ProfileDefinitions/Attributes";
import { DataProfileController } from "./DataService";
import { ResourceFormula } from "shared/calculations/ResourceCalculator";
import { ServerDispatch } from "shared/network/Definitions";

/* =============================================== Service ===================== */
export class ResourcesService {
	private static _instance: ResourcesService | undefined;
	private readonly _map = new Map<Player, Record<ResourceKey, ResourceDTO>>();

	private static heartbeat: RBXScriptConnection | undefined;

	private constructor() {
		print("ResourcesService initialized.");
		this._setupConnections();
	}

	public static Start(): ResourcesService {
		if (!this._instance) {
			this._instance = new ResourcesService();
		}
		return this._instance;
	}

	/* ------------------------------- Public API ------------------------------- */
	public static GetResources(player: Player): Record<ResourceKey, ResourceDTO> | undefined {
		return this.Start()._map.get(player);
	}

	public static ModifyResource(player: Player, key: ResourceKey, delta: number) {
		const svc = this.Start();
		const resources = svc._map.get(player);
		if (!resources) return;
		const data = resources[key];
		if (!data) return;
		const newCurrent = math.clamp(data.current + delta, 0, data.max);
		if (newCurrent === data.current) return;
		data.current = newCurrent;
		ServerDispatch.Server.Get("ResourceUpdated").SendToPlayer(player, key, data.current, data.max);
	}

	public static Recalculate(player: Player) {
		const svc = this.Start();
		const profile = DataProfileController.GetProfile(player);
		const attrs: AttributesDTO = profile?.Data.Attributes ?? DefaultAttributes;
		const level = (profile as unknown as { Data: { Level?: number } })?.Data?.Level ?? 1;

		let resources = svc._map.get(player);
		if (!resources) {
			resources = { ...DEFAULT_RESOURCES };
			svc._map.set(player, resources);
		}

		(RESOURCE_KEYS as ReadonlyArray<ResourceKey>).forEach((key) => {
			const max = ResourceFormula[key](attrs, level);
			const data = resources![key];
			const changed = data.max !== max;
			data.max = max;
			if (data.current > max) {
				data.current = max;
			}
			if (changed) {
				ServerDispatch.Server.Get("ResourceUpdated").SendToPlayer(player, key, data.current, data.max);
			}
		});
	}

	/* ------------------------------- Internal -------------------------------- */
	private _setupConnections() {
		Players.PlayerAdded.Connect((p) => this._onJoin(p));
		Players.PlayerRemoving.Connect((p) => this._onLeave(p));
		Players.GetPlayers().forEach((p) => this._onJoin(p));

		/* Heartbeat Connection */
		ResourcesService.heartbeat?.Disconnect();
		let lastHeartbeat = tick();
		ResourcesService.heartbeat = RunService.Heartbeat.Connect(() => {
			if (tick() - lastHeartbeat < 1) return; // Prevent too frequent updates
			lastHeartbeat = tick();
			// Periodically recalculate resources for all players
			Players.GetPlayers().forEach((player) => {
				const resources = this._map.get(player);
				if (!resources) return;

				// Regenerate resources over time
				(RESOURCE_KEYS as ReadonlyArray<ResourceKey>).forEach((key) => {
					const data = resources[key];
					if (data.current < data.max) {
						data.current = math.min(data.current + 1, data.max); // Regenerate resources over time
						ServerDispatch.Server.Get("ResourceUpdated").SendToPlayer(player, key, data.current, data.max);
					}
				});
			});
		});
		print("ResourcesService heartbeat started.");
	}

	private _onJoin(player: Player) {
		task.defer(() => {
			ResourcesService.Recalculate(player);
		});
	}

	private _onLeave(player: Player) {
		this._map.delete(player);
	}
}

// Auto-start on import
ResourcesService.Start();
