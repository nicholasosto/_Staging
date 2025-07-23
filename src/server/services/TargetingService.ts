/// <reference types="@rbxts/types" />

/**
 * @file        TargetingService.ts
 * @module      TargetingService
 * @layer       Server/Services
 * @description Validates player target selections and replicates them.
 */

import { Workspace } from "@rbxts/services";
import { TargetingRemotes } from "shared/network/targeting.remotes";
import { SSEntity } from "shared/types/SSEntity";

interface PlayerState {
	target?: SSEntity;
}

export class TargetingService {
	private static instance?: TargetingService;
	private entities = new Set<SSEntity>();
	private playerState = new Map<Player, PlayerState>();
	private maxRange = 50;

	private constructor() {
		const selectEvt = TargetingRemotes.Server.Get("SelectTarget");
		const clearEvt = TargetingRemotes.Server.Get("ClearTarget");
		selectEvt.Connect((player, entity) => this.handleSelect(player, entity));
		clearEvt.Connect((player) => this.clearTarget(player));
	}

	public static Start() {
		if (!this.instance) {
			this.instance = new TargetingService();
		}
		return this.instance;
	}

	public registerEntity(entity: SSEntity) {
		this.entities.add(entity);
	}

	public clearTarget(player: Player) {
		const state = this.playerState.get(player);
		if (state && state.target) {
			this.playerState.set(player, {});
			TargetingRemotes.Server.Get("TargetCleared").SendToPlayer(player);
		}
	}

	private handleSelect(player: Player, entity: SSEntity) {
		if (!this.entities.has(entity)) return;
		const char = player.Character;
		const hrp = char && (char.FindFirstChild("HumanoidRootPart") as BasePart);
		const targetRoot = entity.PrimaryPart ?? (entity.FindFirstChild("HumanoidRootPart") as BasePart);
		if (!hrp || !targetRoot) return;
		const distance = hrp.Position.sub(targetRoot.Position).Magnitude;
		if (distance > this.maxRange) return;
		const params = new RaycastParams();
		params.FilterDescendantsInstances = [char, entity];
		params.FilterType = Enum.RaycastFilterType.Exclude;
		const result = Workspace.Raycast(hrp.Position, targetRoot.Position.sub(hrp.Position), params);
		if (result && result.Instance && !entity.IsAncestorOf(result.Instance)) return;
		this.playerState.set(player, { target: entity });
		TargetingRemotes.Server.Get("TargetSelected").SendToPlayer(player, entity);
	}
}
