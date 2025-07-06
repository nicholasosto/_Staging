// @generated-scaffold
/// <reference types="@rbxts/types" />

/**
 * @file        ClientMain.client.ts
 * @module      ClientMain
 * @layer       Client
 * @description Entry point for client scripts.
 */

import { initListener } from "./Network";

export function start() {
	initListener();
	print("ClientMain started");
}

start();
