/// <reference types="@rbxts/types" />

/**
 * @file        TargetingClient.ts
 * @module      TargetingClient
 * @layer       Client
 * @description Client helpers for selecting targets.
 */

import { Players, UserInputService, Workspace } from "@rbxts/services";
import { TargetingRemotes } from "shared/network/targeting.remotes";
import { SSEntity } from "shared/types/SSEntity";

let current: SSEntity | undefined;

TargetingRemotes.Client.Get("TargetSelected").Connect((entity) => {
	current = entity;
});

TargetingRemotes.Client.Get("TargetCleared").Connect(() => {
	current = undefined;
});

function entityFromRay(): SSEntity | undefined {
    print("Targeting: Requesting entity from raycast.");
	const camera = Workspace.CurrentCamera;
	if (!camera) return undefined;
	const pos = UserInputService.GetMouseLocation();
	const ray = camera.ScreenPointToRay(pos.X, pos.Y);
	const result = Workspace.Raycast(ray.Origin, ray.Direction.mul(100));
	if (!result) return undefined;
	const model = result.Instance.FindFirstAncestorOfClass("Model");
	if (model && model.FindFirstChild("Humanoid")) {
		return model as SSEntity;
	}
	return undefined;
}

export const Targeting = {
	getTarget(): SSEntity | undefined {
		return current;
	},
	requestSelect() {
		const entity = entityFromRay();
		if (entity) {
			TargetingRemotes.Client.Get("SelectTarget").SendToServer(entity);
		} else {
			TargetingRemotes.Client.Get("ClearTarget").SendToServer();
		}
	},
};
