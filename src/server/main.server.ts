/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { StartServerNetwork } from "./network";

/* =============================================== Initialization ========================================= */
StartServerNetwork();

print("Server main script initialized successfully.");
