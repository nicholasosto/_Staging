/// <reference types="@rbxts/types" />

/**
 * @file        PlayerLifecycleService.ts
 * @module      PlayerLifecycleService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Handles player joining, spawning, respawning and leaving.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-08 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/services
 *   ./DataService
 *   ./SpawnService
 *   ./ResourcesService
 */

/* =============================================== Imports ===================== */
import { Players } from "@rbxts/services";
import { DataService, SpawnService, ResourcesService } from "server/services";
import { ServerSend } from "server/network";

/* =============================================== Types ======================= */
interface PlayerConnections {
	CharacterAdded?: RBXScriptConnection;
	CharacterRemoving?: RBXScriptConnection;
	HumanoidDied?: RBXScriptConnection;
}

/* =============================================== Service ===================== */
export class PlayerLifecycleService {
	private static _instance: PlayerLifecycleService | undefined;
	private readonly _connections = new Map<Player, PlayerConnections>();
	private readonly _debug: boolean;

	private constructor(debug = false) {
		this._debug = debug;
		// Ensure services load in the correct order
		DataService.Start();
		ResourcesService.Start();
		SpawnService.Start();
		if (this._debug) print("PlayerLifecycleService started");
	}

	public static Start(debug = false): PlayerLifecycleService {
		if (this._instance === undefined) {
			this._instance = new PlayerLifecycleService(debug);
		}
		return this._instance;
	}

	/* ------------------------------- Player Handling ---------------------- */
	public static RegisterPlayer(player: Player) {
		const svc = this.Start();
		task.spawn(async () => {
			await DataService.RegisterPlayer(player);
			while (!DataService.GetProfile(player)) {
				if (svc._debug) warn(`Waiting for profile for ${player.Name}`);
				task.wait(1);
			}
			if (svc._debug) print(`Profile loaded for ${player.Name}`);
			ServerSend.GameStateUpdated(player, true, true);
			ResourcesService.RegisterPlayer(player);
			SpawnService.RegisterPlayer(player);
		});

		const connections: PlayerConnections = {};
		connections.CharacterAdded = player.CharacterAdded.Connect((character) => {
			if (svc._debug) print(`Character added for ${player.Name}`);
			ResourcesService.Start().InitializeResources(player);
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;
			connections.HumanoidDied = humanoid.Died.Connect(() => {
				if (svc._debug) print(`Humanoid died for ${player.Name}`);
			});
		});
		connections.CharacterRemoving = player.CharacterRemoving.Connect(() => {
			if (svc._debug) print(`Character removing for ${player.Name}`);
		});

		svc._connections.set(player, connections);
		if (svc._debug) print(`Registered player ${player.Name}`);
	}

	public static UnregisterPlayer(player: Player) {
		const svc = this.Start();
		const cons = svc._connections.get(player);
		if (cons) {
			cons.CharacterAdded?.Disconnect();
			cons.CharacterRemoving?.Disconnect();
			cons.HumanoidDied?.Disconnect();
			svc._connections.delete(player);
		}
		DataService.UnRegisterPlayer(player);
		if (svc._debug) print(`Unregistered player ${player.Name}`);
	}
}

// Auto-start to connect existing players if needed
Players.GetPlayers().forEach((player) => PlayerLifecycleService.RegisterPlayer(player));
Players.PlayerAdded.Connect((player) => PlayerLifecycleService.RegisterPlayer(player));
Players.PlayerRemoving.Connect((player) => PlayerLifecycleService.UnregisterPlayer(player));
