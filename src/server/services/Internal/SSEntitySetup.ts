import { SSEntity } from "shared";
import { RegisterInstance } from "server/helpers";

/**
 * ╭───────────────────────────────╮
 * │                               │
 * │  SSentitySetup.ts             │
 * │                               │
 * ╰───────────────────────────────╯
 *
 * @description  This file contains the setup for SSEntity instances.
 *               It initializes the necessary properties and methods for SSEntity.
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-23 by Trembus – Initial creation
 */

export function setupSSEntity(characterModel: Model): SSEntity | undefined {
	const sse = characterModel as SSEntity | undefined;
	if (!sse) {
		warn("Internal: SSEntity setup failed, model is not an SSEntity.");
		return undefined;
	}
	RegisterInstance(sse);
	return sse;
}
