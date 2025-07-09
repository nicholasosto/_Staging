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
import { ResourceKey, ResourceDTO, RESOURCE_KEYS, DEFAULT_RESOURCES } from "shared/definitions/Resources";
import { DefaultAttributes, AttributesDTO } from "shared/definitions/ProfileDefinitions/Attributes";
import { DataProfileController } from "./DataService";
import { ResourceFormula } from "shared/calculations/ResourceCalculator";
import { ServerSend } from "server/network";
import { PlayerHelpers } from "shared/helpers/PlayerCharacter";
import { ServerDispatch } from "shared";

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

	public static ModifyResource(player: Player, key: ResourceKey, delta: number): boolean {
		print(`Modifying resource for player ${player.Name}: ${key} by ${delta}`);
		const svc = this.Start();
		const resources = svc._map.get(player);

		// Check if the player has resources initialized
		if (!resources) return false;

		// Check if the resource key is valid
		const resourceData = resources[key];
		if (!resourceData) return false;

		// Check if the delta is zero or negative
		if (delta + resourceData.current < 0) return false;

		// Update the resource value
		const newResourceCurrent = math.clamp(resourceData.current + delta, 0, resourceData.max);

		resourceData.current = newResourceCurrent;

		// Send updated resource data to the player
		ServerSend.ResourceUpdated(player, key, resourceData);
		return true;
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
				ServerSend.ResourceUpdated(player, key, data);
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
						ServerSend.ResourceUpdated(player, key, data);
					}
				});
			});
		});
		print("ResourcesService heartbeat started.");
	}

	private _onJoin(player: Player) {
		task.defer(() => {
			const character = player.Character || player.CharacterAdded.Wait()[0];
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;

			humanoid.HealthChanged.Connect((newHealth) => {
				print(`Health changed for player ${player.Name}: ${newHealth}`);
				const resources = this._map.get(player);
				if (!resources) return;

				const healthData = resources["Health"];
				if (healthData) {
					healthData.current = newHealth;
					ServerDispatch.Server.Get("ResourceUpdated").SendToPlayer(player, "Health", {
						current: healthData.current,
						max: healthData.max,
						regenPerSecond: 0, // Assuming no regen for this example
					});
				}
			});
		});
	}

	private _onLeave(player: Player) {
		this._map.delete(player);
	}
}

// Auto-start on import
ResourcesService.Start();
