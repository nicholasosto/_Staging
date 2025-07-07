/// <reference types="@rbxts/types" />

/**
 * @file        ProgressionSlice.ts
 * @module      ProgressionSlice
 * @layer       Client/State
 * @description Reactive container for level and experience values.
 */

import { Value, Computed } from "@rbxts/fusion";
import {
	PROGRESSION_KEYS,
	ProgressionKey,
	ProgressionDTO,
	DefaultProgression,
} from "shared/definitions/ProfileDefinitions/Progression";
import { CNet } from "client/network/ClientNetworkService";
import { ServerDispatch } from "shared/network/Definitions";

export default class ProgressionSlice {
	private static instance: ProgressionSlice;

        public readonly Progression: Record<ProgressionKey, Value<number>> = {} as never;
        public readonly NextLevelExperience = Value(DefaultProgression.NextLevelExperience);
        public readonly ExperiencePercent = Computed(() =>
                this.Progression.Experience.get() / math.max(this.NextLevelExperience.get(), 1),
        );

	private constructor() {
		for (const key of PROGRESSION_KEYS) {
			this.Progression[key] = Value(DefaultProgression[key]);
		}
		this.fetchFromServer();
		this.setupListeners();
	}

        private async fetchFromServer() {
                const data = (await CNet.GetProfileData("Progression")) as ProgressionDTO | undefined;
                if (data) {
                        for (const key of PROGRESSION_KEYS) {
                                this.Progression[key].set(data[key]);
                        }
                        this.NextLevelExperience.set(data.NextLevelExperience);
                }
        }

	private setupListeners() {
                ServerDispatch.Client.Get("ProgressionUpdated").Connect((progress) => {
                        for (const key of PROGRESSION_KEYS) {
                                this.Progression[key].set(progress[key]);
                        }
                        this.NextLevelExperience.set(progress.NextLevelExperience);
                });
        }

	public static getInstance(): ProgressionSlice {
		if (!this.instance) {
			this.instance = new ProgressionSlice();
		}
		return this.instance;
	}
}
