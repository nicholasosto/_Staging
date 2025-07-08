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
} from "shared/definitions/Resources";

export default class ResourceSlice {
	private static instance: ResourceSlice;

	public readonly Resources: ResourceStateMap = {} as ResourceStateMap;

	private constructor() {
		this.UpdateResources(DEFAULT_RESOURCES);
	}

	public UpdateResource(key: ResourceKey, data: ResourceDTO) {
		this.Resources[key] = createResourceState(key, data);
	}

	public UpdateResources(resources: Record<ResourceKey, { current: number; max: number }>) {
		RESOURCE_KEYS.forEach((key) => {
			if (resources[key]) {
				this.Resources[key] = createResourceState(key, resources[key]);
			} else {
				warn(`Resource ${key} not found in provided resources.`);
				this.Resources[key] = createResourceState(key, { current: 0, max: 0 });
			}
		});
	}

	public static getInstance(): ResourceSlice {
		if (!this.instance) {
			this.instance = new ResourceSlice();
		}
		return this.instance;
	}
}
