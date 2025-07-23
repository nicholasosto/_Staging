/// <reference types="@rbxts/types" />

/**
 * @file        PlayerLifeCycle.ts
 * @module      PlayerLifeCycle
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
import { RunService } from "@rbxts/services";
import { DataService, ResourcesService, AbilityService, CombatService } from "server/services";
import { ServerSend } from "server/network";
import { RegisterInstance } from "./helpers";
import { SSEntity } from "shared";
import { setupSSEntity } from "./services/Internal";

/* ================================ Types ======================= */
interface PlayerConnections {
	CharacterAdded?: RBXScriptConnection;
	CharacterRemoving?: RBXScriptConnection;
	HumanoidDied?: RBXScriptConnection;
}

/* =============================================== Service ===================== */
export class PlayerLifeCycle {
	private static _instance: PlayerLifeCycle | undefined;
	private readonly _connections = new Map<Player, PlayerConnections>();
	private static _heartbeatConnection: RBXScriptConnection | undefined;
	private readonly _debug: boolean;

	private constructor(debug = false) {
		this._debug = debug;
		/* -- Data Layer Initialization -- */
		DataService.Start();

		/* -- Calculated Layer Initialization -- */
		ResourcesService.Start(true);

		/* -- Gameplay Layer Initialization -- */
		AbilityService.Start();
		if (this._debug) print("PlayerLifeCycle started");
	}

	/**
	 * @param debug Whether to enable debug logging.
	 * Destroys the service and cleans up connections.
	 */
	public static Start(debug = false): PlayerLifeCycle {
		if (this._instance === undefined) {
			this._instance = new PlayerLifeCycle(debug);
			this._runHeartbeat();
		}
		return this._instance;
	}

	/**
	 * Registers a player in the service.
	 * @param player The player to register.
	 */
	public static RegisterPlayer(player: Player) {
		warn(`PLC Service: Registering player ${player.Name}`);
		const svc = this.Start();
		/* -- Add an ID to the player -- */
		const registeredInstance = RegisterInstance(player);
		if (registeredInstance === undefined) {
			warn(`Failed to register player ${player.Name}. Instance is undefined.`);
			return;
		}

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
			CombatService.RegisterEntity(character as SSEntity);
			setupSSEntity(character);
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

	private static _runHeartbeat() {
		let lastHeartbeat = tick();
		this._heartbeatConnection?.Disconnect();
		this._heartbeatConnection = RunService.Heartbeat.Connect(() => {
			if (tick() - lastHeartbeat < 1) return; // Throttle heartbeat to once per second
			lastHeartbeat = tick();
			ResourcesService.OnHeartbeat();
		});
	}
}
