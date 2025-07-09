/// <reference types="@rbxts/types" />

/**
 * @file        ResourceSlice.ts
 * @module      ResourceSlice
 * @layer       Client/State
 * @description Reactive container for player resources like health and mana.
 */

/**
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 */

import {
	ResourceKey,
	RESOURCE_KEYS,
	DEFAULT_RESOURCES,
	ResourceDTO,
	createResourceState,
	ResourceStateMap,
	ResourceDataMap,
} from "shared/definitions/Resources";

export default class ResourceSlice {
	private static instance: ResourceSlice;

	public Health: ResourceStateMap["Health"];
	public Mana: ResourceStateMap["Mana"];
	public Stamina: ResourceStateMap["Stamina"];

	private constructor() {
		this.Health = createResourceState(DEFAULT_RESOURCES.Health);
		this.Mana = createResourceState(DEFAULT_RESOURCES.Mana);
		this.Stamina = createResourceState(DEFAULT_RESOURCES.Stamina);
	}

	public UpdateResources(data: ResourceDataMap): void {
		print("Updating resources with data:", data);
		this.Health = createResourceState(data.Health);
		this.Mana = createResourceState(data.Mana);
		this.Stamina = createResourceState(data.Stamina);
	}

	public UpdateResource(key: ResourceKey, data: ResourceDTO): void {
		print(`Updating resource ${key} with data:`, data);
		switch (key) {
			case "Health":
				this.Health = createResourceState(data);
				break;
			case "Mana":
				this.Mana = createResourceState(data);
				break;
			case "Stamina":
				this.Stamina = createResourceState(data);
				break;
			default:
				print(`Unknown resource key: ${key}`);
				break;
		}
	}

	public static getInstance(): ResourceSlice {
		if (!this.instance) {
			this.instance = new ResourceSlice();
		}
		return this.instance;
	}
}
