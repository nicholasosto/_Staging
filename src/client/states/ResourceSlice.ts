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
	createStateResources,
	ResourceStateMap,
	ResourceDataMap,
} from "shared/definitions/Resources";
import { Computed, Value } from "@rbxts/fusion";

export default class ResourceSlice {
	private static instance: ResourceSlice;

	public Health: ResourceStateMap["Health"];
	public Mana: ResourceStateMap["Mana"];
	public Stamina: ResourceStateMap["Stamina"];

	private constructor() {
		const states = createStateResources(DEFAULT_RESOURCES);
		this.Health = states.Health;
		this.Mana = states.Mana;
		this.Stamina = states.Stamina;

		this.Health.percent = Computed(() => {
			const current = this.Health.current.get();
			const max = this.Health.max.get();
			return max > 0 ? current / max : 0;
		});
		this.Mana.percent = Computed(() => {
			const current = this.Mana.current.get();
			const max = this.Mana.max.get();
			return max > 0 ? current / max : 0;
		});
		this.Stamina.percent = Computed(() => {
			const current = this.Stamina.current.get();
			const max = this.Stamina.max.get();
			return max > 0 ? current / max : 0;
		});
	}

	/**
	 * Apply a full resource snapshot to the local state.
	 * @param data - Map of resource data keyed by resource name.
	 */
	public UpdateResources(data: ResourceDataMap): void {
		(RESOURCE_KEYS as readonly ResourceKey[]).forEach((key) => {
			this.UpdateResource(key, data[key]);
		});
	}

	/**
	 * Update a single resource entry in place.
	 * @param key - Resource identifier.
	 * @param data - New resource values.
	 */
	public UpdateResource(key: ResourceKey, data: ResourceDTO): void {
		switch (key) {
			case "Health":
				this._assign(this.Health, data);
				break;
			case "Mana":
				this._assign(this.Mana, data);
				break;
			case "Stamina":
				this._assign(this.Stamina, data);
				break;
		}
	}

	private _assign(state: ResourceStateMap[ResourceKey], data: ResourceDTO) {
		state.current.set(data.current);
		state.max.set(data.max);
		if (data.regenPerSecond !== undefined) {
			if (state.regenPerSecond) {
				state.regenPerSecond.set(data.regenPerSecond);
			} else {
				state.regenPerSecond = Value(data.regenPerSecond);
			}
		}
	}

	public static getInstance(): ResourceSlice {
		if (!this.instance) {
			this.instance = new ResourceSlice();
		}
		return this.instance;
	}
}
