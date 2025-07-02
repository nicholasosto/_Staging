/**
 * @file        src/client/network/ServerDispatch.ts
 * @module      ServerDispatch
 * @layer       Server/Network
 * @description Handles server-side network dispatching for game events.
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
 *   @rbxts/fusion ^0.4.0
 */
/* =============================================== Imports =============================================== */
import { Network } from "shared/network/Definitions";
import { ServerDispatchEvents } from "shared/network/Definitions";

/* ================================================ Events =============================================== */

const ResourceUpdated = ServerDispatchEvents.Server.Get("ResourceUpdated");
