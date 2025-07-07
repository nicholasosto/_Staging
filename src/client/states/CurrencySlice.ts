/// <reference types="@rbxts/types" />

/**
 * @file        CurrencySlice.ts
 * @module      CurrencySlice
 * @layer       Client/State
 * @description Reactive container for player currency amounts.
 */

import { Value } from "@rbxts/fusion";
import { CURRENCY_KEY, CurrencyKey, DefaultCurrency } from "shared/definitions/ProfileDefinitions/Currency";

export default class CurrencySlice {
    private static instance: CurrencySlice;

    public readonly Currency: Record<CurrencyKey, Value<number>> = {} as never;

    private constructor() {
        for (const key of CURRENCY_KEY) {
            this.Currency[key] = Value(DefaultCurrency[key]);
        }
    }

    public static getInstance(): CurrencySlice {
        if (!this.instance) {
            this.instance = new CurrencySlice();
        }
        return this.instance;
    }
}
