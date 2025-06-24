/// <reference types="@rbxts/types" />

/**
 * @file        BattleRoomService.ts
 * @module      BattleRoomService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Handles creation of battle rooms and teleports players to the battle place.
 */

/* =============================================== Imports ================================== */
import { HttpService, TeleportService } from "@rbxts/services";
import { Network } from "shared/network";

/* =============================================== Constants ================================= */
const COUNTDOWN_TIME = 30; // seconds
const BATTLE_PLACE_ID = 0; // TODO: replace with actual place ID

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
		const room = this._rooms.get(roomId);
		if (!room) return;
		if (room.players.has(player)) {
			room.players.set(player, gemId);
		}
	}

	/* ------------------------------- Internal ------------------------------- */

	private static _startCountdown(room: BattleRoom) {
		room.countdownTask = task.spawn(() => {
			for (let remaining = COUNTDOWN_TIME; remaining > 0; remaining--) {
				const players = this._collectPlayers(room);
				Network.Server.Get("RoomCountdown").SendToPlayers(players, room.id, remaining);
				task.wait(1);
			}
			this._launchRoom(room);
		});
	}

	private static _collectPlayers(room: BattleRoom): Player[] {
		const result = new Array<Player>();
		room.players.forEach((_, p) => result.push(p));
		return result;
	}

	private static _launchRoom(room: BattleRoom) {
		const players = this._collectPlayers(room);
		const [code] = TeleportService.ReserveServer(BATTLE_PLACE_ID);
		TeleportService.TeleportToPrivateServer(BATTLE_PLACE_ID, code, players);
		this._rooms.delete(room.id);
	}
}
