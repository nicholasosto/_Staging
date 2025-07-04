/// <reference types="@rbxts/types" />

/**
 * @file        AttributesService.ts
 * @module      AttributesService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Validates and mutates player attribute values.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-03 by Codex – Initial creation
 */

/* =============================================== Imports ===================== */
import { AttributeKey, clampAttr } from "shared/definitions/ProfileDefinitions/Attributes";
import { DataProfileController } from "./DataService";
import { ResourcesService } from "./ResourcesService";

/* =============================================== Service ===================== */
export class AttributesService {
    private static _instance: AttributesService | undefined;

    private constructor() {
        print("AttributesService initialized.");
    }

    public static Start(): AttributesService {
        if (!this._instance) {
            this._instance = new AttributesService();
        }
        return this._instance;
    }

    public static Increase(player: Player, key: AttributeKey, amount: number) {
        const profile = DataProfileController.GetProfile(player);
        if (!profile) return;
        const attrs = profile.Data.Attributes;
        const newValue = clampAttr(key, attrs[key] + amount);
        const delta = newValue - attrs[key];
        if (delta === 0) return;
        attrs[key] = newValue;
        attrs.SpentPoints += delta;
        attrs.AvailablePoints = math.max(attrs.AvailablePoints - delta, 0);
        ResourcesService.Recalculate(player);
    }

    public static Get(player: Player) {
        return DataProfileController.GetProfile(player)?.Data.Attributes;
    }
}

// Auto-start on import
AttributesService.Start();
