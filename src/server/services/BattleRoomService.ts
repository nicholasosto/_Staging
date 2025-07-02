/// <reference types="@rbxts/types" />

/**
 * @file        BattleRoomService.ts
 * @module      BattleRoomService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Handles creation of battle rooms and teleports players to the battle place.
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
 */

/* =============================================== Imports ================================== */
import { HttpService, TeleportService } from "@rbxts/services";
import { Network } from "shared/network";

/* =============================================== Constants ================================= */
const COUNTDOWN_TIME = 10; // seconds
const BATTLE_PLACE_ID = 78520415943353; // TODO: replace with actual place ID

/* =============================================== Types ===================================== */
interface BattleRoom {
	id: string;
	players: Map<Player, string>; // Player → active gemId
	countdownTask?: thread;
}

/* =============================================== Service =================================== */
export class BattleRoomService {
	private static _instance: BattleRoomService | undefined;
	private static _rooms = new Map<string, BattleRoom>();

	private constructor() {
		print("BattleRoomService initialized.");
	}

	public static Start(): BattleRoomService {
		if (this._instance === undefined) {
			this._instance = new BattleRoomService();
		}
		return this._instance;
	}

	/* ------------------------------- Public API ------------------------------- */

	public static CreateRoom(owner: Player): string {
		print(`Creating battle room for player: ${owner.Name}`);
		this.Start();
		const id = HttpService.GenerateGUID(false);
		const room: BattleRoom = {
			id,
			players: new Map<Player, string>(),
		};
		this._rooms.set(id, room);
		this.JoinRoom(owner, id);
		return id;
	}

	public static JoinRoom(player: Player, roomId: string) {
		print(`Player ${player.Name} joining room: ${roomId}`);
		const room = this._rooms.get(roomId);
		if (!room) {
			warn(`BattleRoom ${roomId} not found`);
			return;
		}
		if (!room.players.has(player)) {
			room.players.set(player, "");
		}
		if (!room.countdownTask) {
			this._startCountdown(room);
		}
	}

	public static SetActiveGem(player: Player, roomId: string, gemId: string) {
		print(`Setting active gem for player ${player.Name} in room ${roomId} to ${gemId}`);
		const room = this._rooms.get(roomId);
		if (!room) return;
		if (room.players.has(player)) {
			room.players.set(player, gemId);
		}
	}

	/* ------------------------------- Internal ------------------------------- */

	private static _startCountdown(room: BattleRoom) {
		print(`Starting countdown for room: ${room.id}`);
		room.countdownTask = task.spawn(() => {
			for (let remaining = COUNTDOWN_TIME; remaining > 0; remaining--) {
				const players = this._collectPlayers(room);
				Network.Server.Get("RoomCountdown").SendToPlayers(players, room.id, remaining);
				print(`Countdown for room ${room.id}: ${remaining} seconds remaining`);
				task.wait(1);
			}
			this._launchRoom(room);
		});
	}

	private static _collectPlayers(room: BattleRoom): Player[] {
		const result = new Array<Player>();
		room.players.forEach((_, p) => result.push(p));
		if (result.size() === 0) {
			warn(`No players in room ${room.id}`);
			return result;
		}
		print(`Collecting players for room ${room.id}: ${result.map((p) => p.Name).join(", ")}`);
		return result;
	}

	private static _launchRoom(room: BattleRoom) {
		const players = this._collectPlayers(room);
		const teleportsResult = TeleportService.TeleportAsync(BATTLE_PLACE_ID, players);
		print(`Launching battle room ${room.id} with code: ${teleportsResult}`);
		this._rooms.delete(room.id);
		print(`Battle room ${room.id} launched and deleted.`);
	}
}
