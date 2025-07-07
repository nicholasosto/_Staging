/// <reference types="@rbxts/types" />

/**
 * @file        ResourceSlice.ts
 * @module      ResourceSlice
 * @layer       Client/State
 * @description Reactive container for player resources like health and mana.
 */

import { Value, Computed } from "@rbxts/fusion";
import { ResourceKey, RESOURCE_KEYS, DEFAULT_RESOURCES } from "shared/definitions/Resources";
import { ServerDispatch } from "shared/network/Definitions";

export type ResourceState = {
    Current: Value<number>;
    Max: Value<number>;
    Percent: Computed<number>;
};

export default class ResourceSlice {
    private static instance: ResourceSlice;

    public readonly Resources: Record<ResourceKey, ResourceState> = {} as never;

    private constructor() {
        for (const key of RESOURCE_KEYS) {
            const data = DEFAULT_RESOURCES[key];
            const current = Value(data.current);
            const max = Value(data.max);
            this.Resources[key] = {
                Current: current,
                Max: max,
                Percent: Computed(() => current.get() / math.max(max.get(), 1)),
            };
        }
        this.setupListeners();
    }

    private setupListeners() {
        ServerDispatch.Client.Get("ResourceUpdated").Connect((key, current, max) => {
            const res = this.Resources[key];
            if (res) {
                res.Current.set(current);
                res.Max.set(max);
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
