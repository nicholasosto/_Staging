import { Zone } from "@rbxts/zone-plus";
import { Players, Workspace } from "@rbxts/services";
import { BattleRoomService } from "server/services";
import { AlienOrganism } from "server/entity/AlienOrganism";

/**
 * @file        src/server/zones/LobbyZone.ts
 * @module      LobbyZone
 * @layer       Server
 * @description Zone for the lobby area of the game.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/zone-plus ^1.0.0
 */

export class LobbyZone {
	public static instance: LobbyZone;
	public static readonly Name = "LobbyZone";
	public static readonly Description = "A zone for the lobby area where players can gather before starting the game.";
	public static readonly PlayersInZone: Map<number, Player> = new Map();
	public static ZoneContainer: Instance;
	public static ZoneInstance: Zone;
	public static PlayerJoinedConnection: RBXScriptConnection | undefined;
	public static PlayerLeftConnection: RBXScriptConnection | undefined;

	private constructor() {}

	public static Start(): LobbyZone {
		if (LobbyZone.instance === undefined) {
			LobbyZone.instance = new LobbyZone();
			LobbyZone.ZoneContainer = Workspace.WaitForChild("LobbyZoneContainer") as Instance;
			LobbyZone.ZoneInstance = new Zone(LobbyZone.ZoneContainer);
			LobbyZone.initializeConnections();
			warn(`LobbyZone started: ${LobbyZone.Name} - ${LobbyZone.Description}`);
		}
		return LobbyZone.instance;
	}

	private static initializeConnections(): void {
		// Connect player joining events
		this.PlayerJoinedConnection = LobbyZone.ZoneInstance.playerEntered.Connect((player: Player) => {
			print(`Player ${player.Name} has entered the Lobby Zone.`);
			LobbyZone.onPlayerJoined(player);
		});
		// Connect player exiting events
		this.PlayerLeftConnection = LobbyZone.ZoneInstance.playerExited.Connect((player: Player) => {
			print(`Player ${player.Name} has exited the Lobby Zone.`);
			LobbyZone.onPlayerExited(player);
		});
	}

	private static onPlayerJoined(player: Player): void {
		if (!LobbyZone.PlayersInZone.has(player.UserId)) {
			LobbyZone.PlayersInZone.set(player.UserId, player);
			BattleRoomService.CreateRoom(player); // Automatically create a battle room for the player
			const testAlien = new AlienOrganism(`TestAlien-${player.Name}`, new CFrame(0, 5, 0));
			print(`Player ${player.Name} has joined the Lobby Zone.`);
		}
	}

	private static onPlayerExited(player: Player): void {
		if (LobbyZone.PlayersInZone.has(player.UserId)) {
			LobbyZone.PlayersInZone.delete(player.UserId);
			print(`Player ${player.Name} has left the Lobby Zone.`);
		}
	}
}
