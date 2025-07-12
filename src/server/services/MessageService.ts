/**
 * @file src/server/services/MessageService.ts
 * @module MessageService
 * @owner Trembus
 * @since 0.2.0
 * @lastUpdate 2025-07-12
 * @remarks
 * Handles Message data construction and provides utility methods for other services.
 */

import { Players, RunService } from "@rbxts/services";
import { ServerSend } from "server/network";
import { MessageShape } from "shared/definitions/Message";

/// <reference types="@rbxts/types" />

/*──── Constants ──────────────────────────────────────────────────────*/
const SERVICE_NAME = "MessageService";

/*──── Service Class ──────────────────────────────────────────────────*/
export default class MessageService {
	private static _instance?: MessageService;
	public static Start(): MessageService {
		if (!this._instance) this._instance = new MessageService();
		return this._instance;
	}
	public static Destroy(): void {
		this._instance?.destroyInternal();
		this._instance = undefined;
	}

	private constructor() {
		if (RunService.IsStudio()) print(`${SERVICE_NAME} started`);
	}

	/** Sends a message to a specific player. */
	public SendMessageToPlayer(player: Player, message: MessageShape) {
		// TODO: Replace with network dispatch logic
		warn(`Message to ${player.Name}: [${message.severity ?? "info"}] ${message.content}`);
		ServerSend.SendMessageToPlayer(player, message);
	}

	/** Sends an error message to a specific player. */
	public SendErrorToPlayer(player: Player, message: MessageShape) {
		message.severity = "error";
		this.SendMessageToPlayer(player, message);
	}

	/** Sends a message to all connected players. */
	public SendServerWideMessage(message: MessageShape) {
		for (const player of Players.GetPlayers()) {
			this.SendMessageToPlayer(player, message);
		}
	}

	private destroyInternal() {
		if (RunService.IsStudio()) warn(`${SERVICE_NAME} destroyed`);
	}
}
