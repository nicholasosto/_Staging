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
 *
 * @dependencies
 *   @rbxts/services
 *   shared/definitions/Resources
 *   shared/definitions/ProfileDefinitions/Attributes
 *   ./DataService
 *   shared/calculations/ResourceCalculator
 *   shared/network/Definitions
 */

/* =============================================== Imports ===================== */
import { Players, RunService } from "@rbxts/services";
import { ResourceKey, ResourceDTO, RESOURCE_KEYS } from "shared/definitions/Resources";
import { DefaultAttributes, AttributesDTO } from "shared/definitions/ProfileDefinitions/Attributes";
import { DataService } from "./DataService";
import { calculateResources } from "shared/calculations";
import { ServerSend } from "server/network";

/* =============================================== Service ===================== */
export class ResourcesService {
	private static _instance: ResourcesService | undefined;
	private readonly _map = new Map<Player, Record<ResourceKey, ResourceDTO>>();
	private readonly _lastSend = new Map<Player, Map<ResourceKey, number>>();

	private static heartbeat: RBXScriptConnection | undefined;

	private constructor() {
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

	public static ModifyResource(player: Player, key: ResourceKey, delta: number): boolean {
		const svc = this.Start();
		const resources = svc._map.get(player);
		const resourceData = resources?.[key];

		if (!this.ValidateResourceModification(player, key, delta) || !resourceData) {
			return false;
		}

		// Update the resource value
		const newResourceCurrent = math.clamp(resourceData.current + delta, 0, resourceData.max);
		resourceData.current = newResourceCurrent;

		// Send updated resource data to the player
		svc._send(player, key, resourceData);
		return true;
	}

	public static ValidateResourceModification(player: Player, key: ResourceKey, delta: number): boolean {
		const resources = this.GetResources(player);
		if (!resources) return false;
		const resourceData = resources[key];
		if (!resourceData) return false;
		return resourceData.current + delta >= 0 && resourceData.current + delta <= resourceData.max;
	}

	public static Recalculate(player: Player) {
		const svc = this.Start();
		const attributeData = DataService.GetProfileDataByKey(player, "Attributes");
		const progressionData = DataService.GetProfileDataByKey(player, "Progression");
		if (!attributeData || !progressionData) {
			warn(`ResourcesService: Missing attribute or progression data for player ${player.Name}`);
			return;
		}
		const current = svc._map.get(player);
		const snapshot = calculateResources(attributeData, progressionData.Level, current);
		svc._map.set(player, snapshot);

		(RESOURCE_KEYS as readonly ResourceKey[]).forEach((key) => {
			svc._send(player, key, snapshot[key]);
		});
	}

	/* ------------------------------- Internal -------------------------------- */
	private _setupConnections() {

		/* Heartbeat Connection */
		ResourcesService.heartbeat?.Disconnect();
		let lastHeartbeat = tick();
		ResourcesService.heartbeat = RunService.Heartbeat.Connect(() => {
			if (tick() - lastHeartbeat < 1) return; // Prevent too frequent updates
			lastHeartbeat = tick();
			// Periodically sync and regenerate resources for all players
			Players.GetPlayers().forEach((player) => {
				const resources = this._map.get(player);
				if (!resources) return;
				const character = player.Character;
				const humanoid = character?.FindFirstChildOfClass("Humanoid") as Humanoid | undefined;
				if (humanoid) {
					if (humanoid.Health !== resources.Health.current) {
						humanoid.Health = resources.Health.current;
					}
					if (humanoid.MaxHealth !== resources.Health.max) {
						humanoid.MaxHealth = resources.Health.max;
					}
				}

				// Regenerate resources over time
				(RESOURCE_KEYS as ReadonlyArray<ResourceKey>).forEach((key) => {
					const data = resources[key];
					if (data.current < data.max) {
						data.current = math.min(data.current + 1, data.max); // Regenerate resources over time
						this._send(player, key, data);
					}
				});
			});
		});
		// heartbeat ready
	}

	public InitializeResources(player: Player) {
		task.defer(() => {
			const character = player.Character || player.CharacterAdded.Wait()[0];
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;

			const attributeData = DataService.GetProfileDataByKey(player, "Attributes");
			const progressionData = DataService.GetProfileDataByKey(player, "Progression");
			const level = progressionData?.Level ?? 1;

			if (!attributeData || !progressionData) {
				warn(`ResourcesService: Missing attribute or progression data for player ${player.Name}`);
				return;
			}

			const resources = calculateResources(attributeData, level);
			this._map.set(player, resources);

			humanoid.MaxHealth = resources.Health.max;
			humanoid.Health = resources.Health.current;

			(RESOURCE_KEYS as readonly ResourceKey[]).forEach((key) => {
				this._send(player, key, resources[key]);
			});

			humanoid.HealthChanged.Connect((newHealth) => {
				const res = this._map.get(player);
				if (!res) return;
				const healthData = res["Health"];
				healthData.current = newHealth;
				this._send(player, "Health", healthData);
			});
		});
	}

	private _onLeave(player: Player) {
		this._map.delete(player);
		this._lastSend.delete(player);
	}

	/**
	 * Send a throttled ResourceUpdated event to the client.
	 * @param player - Target player.
	 * @param key - Resource identifier.
	 * @param data - Resource snapshot to send.
	 */
	private _send(player: Player, key: ResourceKey, data: ResourceDTO) {
		const now = tick();
		let map = this._lastSend.get(player);
		if (!map) {
			map = new Map<ResourceKey, number>();
			this._lastSend.set(player, map);
		}
		const last = map.get(key) ?? 0;
		if (now - last >= 0.1) {
			map.set(key, now);
			ServerSend.ResourceUpdated(player, key, data);
		}
	}
}

// Auto-start on import
ResourcesService.Start();
