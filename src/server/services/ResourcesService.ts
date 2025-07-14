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
import { RunService } from "@rbxts/services";
import { ResourceKey, ResourceDTO, RESOURCE_KEYS, ResourceDataMap } from "shared/definitions/Resources";
import { DefaultAttributes } from "shared/definitions/ProfileDefinitions/Attributes";
import { DataService } from "./DataService";
import { calculateResources } from "shared/calculations";
import { ServerSend } from "server/network";

/* =============================================== Service ===================== */
export class ResourcesService {
	private static _instance: ResourcesService | undefined;
	private readonly _map = new Map<Player, Record<ResourceKey, ResourceDTO>>();
	private readonly _lastSend = new Map<Player, Map<ResourceKey, number>>();
	private static _heartbeatConnection: RBXScriptConnection | undefined;

	private constructor() {
		if (RunService.IsStudio()) warn(`ResourcesService started`);
	}

	public static Start(): ResourcesService {
		if (!this._instance) {
			this._instance = new ResourcesService();
			let lastHeartbeat = tick();
			this._heartbeatConnection = RunService.Heartbeat.Connect(() => {
				if (tick() - lastHeartbeat < 1) return; // Throttle heartbeat to once per second
				this._instance?._map.forEach((resources, player) => {
					if (!player.Character) return; // Skip if player has no character
					this.regenerationTick(player);
				});
				lastHeartbeat = tick();
				print(`[ResourcesService] Heartbeat running`);
			});
		}
		return this._instance;
	}

	private static regenerationTick(player: Player) {
		const svc = this.Start();
		const resources = svc._map.get(player);
		if (!resources) {
			warn(`ResourcesService: No resources found for player ${player.Name}`);
			return;
		}
		// Regenerate resources here, e.g., Health, Mana, Stamina
		const healthResource = resources.Health;
		if (healthResource.current < healthResource.max) {
			healthResource.current = math.min(healthResource.current + 1, healthResource.max);
			svc._send(player, "Health", healthResource);
		}
		// Add similar logic for other resources like Mana, Stamina, etc.
		const manaResource = resources.Mana;
		if (manaResource.current < manaResource.max) {
			manaResource.current = math.min(manaResource.current + 1, manaResource.max);
			svc._send(player, "Mana", manaResource);
		}
		const staminaResource = resources.Stamina;
		if (staminaResource.current < staminaResource.max) {
			staminaResource.current = math.min(staminaResource.current + 1, staminaResource.max);
			svc._send(player, "Stamina", staminaResource);
		}
	}

	/* -- Register Player -- */
	public static RegisterPlayer(player: Player): boolean {
		const svc = this.Start();
		/* -- Check if player is already registered -- */
		if (svc._map.has(player)) {
			warn(`ResourcesService: Player ${player.Name} is already registered.`);
			return true; // Already registered
		}
		/* -- Initialize player resources -- */
		svc._map.set(player, svc._calculatePlayerResources(player));

		/* -- Initialize player character and humanoid -- */
		task.spawn(() => {
			const character = player.Character || player.CharacterAdded.Wait()[0];
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;
			const resources = svc._map.get(player);
			if (!resources) {
				warn(`ResourcesService: No resources found for player ${player.Name}`);
				return false; // Failed to register
			}
			humanoid.MaxHealth = resources.Health.max;
			humanoid.Health = resources.Health.current;
			humanoid.HealthChanged.Connect((newHealth) => {
				// Update health resource when humanoid health changes
				const healthResource = resources.Health;
				healthResource.current = math.clamp(newHealth, 0, healthResource.max);
				svc._send(player, "Health", healthResource);
			});
			// Send initial resources to the player
			for (const key of RESOURCE_KEYS) {
				svc._send(player, key, resources[key]);
			}
			/* -- Connect player leave event -- */
			player.AncestryChanged.Connect((_, parent) => {
				if (parent === undefined) {
					svc._onLeave(player);
				}
			});
		});

		return true; // Successfully registered
	}

	private _calculatePlayerResources(player: Player): ResourceDataMap {
		const svc = ResourcesService.Start();
		const attributeData = DataService.GetProfileDataByKey(player, "Attributes") ?? DefaultAttributes;
		const progressionData = DataService.GetProfileDataByKey(player, "Progression");
		const level = progressionData?.Level ?? 1;
		return calculateResources(attributeData, level, svc._map.get(player));
	}

	/* Get Resources ------------------------------- */
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
		if (key === "Health") {
			const humanoid = player.Character?.FindFirstChildOfClass("Humanoid");
			if (humanoid) {
				humanoid.Health = newResourceCurrent;
			} else {
				warn(`ResourcesService: Humanoid not found for player ${player.Name}`);
				return false;
			}
		}

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
		const resources = svc._calculatePlayerResources(player);
		svc._map.set(player, resources);

		// Send updated resources to the player
		for (const key of RESOURCE_KEYS) {
			svc._send(player, key, resources[key]);
		}
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
