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
 *   ./AbilityService
 *   ./DataService
 *   ./ResourcesService
 */

/* =============================================== Imports ===================== */
import { DataService, ResourcesService, AbilityService } from "server/services";
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
		/* -- Data Layer Initialization -- */
		DataService.Start();

		/* -- Calculated Layer Initialization -- */
		ResourcesService.Start();

		/* -- Gameplay Layer Initialization -- */
		AbilityService.Start();
		if (this._debug) print("PlayerLifecycleService started");
	}

	/**
	 * @param debug Whether to enable debug logging.
	 * Destroys the service and cleans up connections.
	 */
	public static Start(debug = false): PlayerLifecycleService {
		if (this._instance === undefined) {
			this._instance = new PlayerLifecycleService(debug);
		}
		return this._instance;
	}

	/**
	 * Registers a player in the service.
	 * @param player The player to register.
	 */
	public static RegisterPlayer(player: Player) {
		const svc = this.Start();

		/* -- Player Already Registered? -- */
		if (svc._connections.has(player)) {
			if (svc._debug) warn(`Player ${player.Name} is already registered.`);
			return;
		}

		/* -- Register Player in DataService -- */
		task.spawn(async () => {
			/* -Load Player Profile - */
			await DataService.RegisterPlayer(player);
			while (!DataService.GetProfile(player)) {
				if (svc._debug) warn(`Waiting for profile for ${player.Name}`);
				task.wait(1);
			}
			if (svc._debug) print(`Profile loaded for ${player.Name}`);
			/* - Update Game State - */
			ServerSend.GameStateUpdated(player, true, true);

			/* - Register Player in Services - */
			ResourcesService.RegisterPlayer(player);
			AbilityService.RegisterPlayer(player);

			player.LoadCharacter();
			if (svc._debug) print(`Character loaded for ${player.Name}`);
		});

		/* -- Player Lifecycle Connections -- */
		const connections: PlayerConnections = {};

		/* - Character Added - */
		connections.CharacterAdded = player.CharacterAdded.Connect((character) => {
			if (svc._debug) print(`Character added for ${player.Name}`);
			ResourcesService.Start().InitializeResources(player);
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;
			connections.HumanoidDied = humanoid.Died.Connect(() => {
				if (svc._debug) print(`Humanoid died for ${player.Name}`);
				character.Destroy(); // Cleanup character on death
				ResourcesService.Recalculate(player); // Recalculate resources on death
				player.LoadCharacter(); // Respawn character
			});
		});

		/* - Character Removing - */
		connections.CharacterRemoving = player.CharacterRemoving.Connect(() => {
			if (svc._debug) print(`Character removing for ${player.Name}`);
		});
		svc._connections.set(player, connections);

		/* -- Debug Log -- */
		if (svc._debug) print(`Registered player ${player.Name}`);
	}

	/**
	 * @param player The player to unregister.
	 * Unregisters the player from all services and disconnects their connections.
	 */
	public static UnregisterPlayer(player: Player) {
		const svc = this.Start();

		/* -- Get Player Connections -- */
		const cons = svc._connections.get(player);
		if (cons) {
			cons.CharacterAdded?.Disconnect();
			cons.CharacterRemoving?.Disconnect();
			cons.HumanoidDied?.Disconnect();
			svc._connections.delete(player);
		}
		/* Unregister Player from Services */
		AbilityService.UnregisterPlayer(player);
		DataService.UnRegisterPlayer(player);
		if (svc._debug) print(`Unregistered player ${player.Name}`);
	}
}

// Auto-start to connect existing players if needed
//Players.GetPlayers().forEach((player) => PlayerLifecycleService.RegisterPlayer(player));
// Players.PlayerAdded.Connect((player) => PlayerLifecycleService.RegisterPlayer(player));
// Players.PlayerRemoving.Connect((player) => PlayerLifecycleService.UnregisterPlayer(player));
