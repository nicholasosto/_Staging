import { Workspace } from "@rbxts/services";
import { ZoneBase } from "./ZoneBase";
import { StatusEffectService } from "server/services";
import { BattleZoneInstance } from "./BattleZone";

/**
 * @file        zone.server.ts
 * @module      ZoneServer
 * @layer       Server/Zones
 * @description Module for managing zones in the game.
 */

/* ================================================ Containers =============================================== */
const zoneBattle = BattleZoneInstance;
print("Zone Battle Instance:", zoneBattle);
