import Fusion, { Observer, Value, Computed } from "@rbxts/fusion";
import {
	AbilityKey,
	AttributeKey,
	ATTR_KEYS,
	AttributesDTO,
	DefaultAttributes,
	CurrencyKey,
	CURRENCY_KEY,
	DefaultCurrency,
} from "shared/definitions";
import { ResourceKey, RESOURCE_KEYS, DEFAULT_RESOURCES } from "shared/definitions/Resources";
import { StatusEffect } from "shared/definitions/StatusEffect";
import { GetProfileData } from "client/network/ClientNetworkService";

/**
 * @file        src/client/states/PlayerState.ts
 * @module      PlayerState
 * @layer       Client
 * @description Defines the player's health, mana, and stamina states.
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
export type ResourceState = {
	Current: Value<number>;
	Max: Value<number>;
	Percent: Computed<number>;
};

export default class PlayerState {
	private static instance: PlayerState;

	/** Ability list from the player's profile */
	public Abilities: Value<AbilityKey[]> = Value([]);

	/** Attribute values and point totals */
	public Attributes: Record<AttributeKey, Value<number>> = {} as never;
	public AttributeAvailable = Value(0);
	public AttributeSpent = Value(0);

	/** Currency amounts */
	public Currency: Record<CurrencyKey, Value<number>> = {} as never;

	/** Active status effects */
	public StatusEffects = Value<StatusEffect[]>([]);

	/** Player resource values */
	public Resources: Record<ResourceKey, ResourceState> = {} as never;

	private constructor() {
		PlayerState.instance = this;

		// initialize attribute values
		for (const key of ATTR_KEYS) {
			this.Attributes[key] = Value(DefaultAttributes[key]);
		}
		this.AttributeAvailable.set(DefaultAttributes.AvailablePoints);
		this.AttributeSpent.set(DefaultAttributes.SpentPoints);

		// initialize currency
		for (const key of CURRENCY_KEY) {
			this.Currency[key] = Value(DefaultCurrency[key]);
		}

		// initialize resources using defaults
		for (const key of RESOURCE_KEYS) {
			const data = DEFAULT_RESOURCES[key];
			const current = Value(data.current);
			const max = Value(data.max);
			this.Resources[key] = {
				Current: current,
				Max: max,
				Percent: Computed(() => current.get() / math.max(max.get(), 1)),
			};
		}

		//this.debugObserverInit();
		this.fetchFromServer(); // Fetch initial data from the server
	}

	private debugObserverInit() {
		const inst = PlayerState.getInstance();
		const res = inst.Resources;
		Observer(res.Health.Current).onChange(() => {
			print(`Health: ${res.Health.Current.get()}/${res.Health.Max.get()}`);
		});
		Observer(res.Mana.Current).onChange(() => {
			print(`Mana: ${res.Mana.Current.get()}/${res.Mana.Max.get()}`);
		});
		Observer(res.Stamina.Current).onChange(() => {
			print(`Stamina: ${res.Stamina.Current.get()}/${res.Stamina.Max.get()}`);
		});
	}

	private async fetchFromServer() {
		GetProfileData("Abilities").then((abilities) => {
			if (abilities) {
				this.Abilities.set(abilities as AbilityKey[]);
			}
		});

		const attrs = await GetProfileData("Attributes");
		if (attrs) {
			const data = attrs as AttributesDTO;
			for (const key of ATTR_KEYS) {
				this.Attributes[key].set(data[key]);
			}
			this.AttributeAvailable.set(data.AvailablePoints);
			this.AttributeSpent.set(data.SpentPoints);
		}
	}

	public static getInstance(): PlayerState {
		if (!PlayerState.instance) {
			PlayerState.instance = new PlayerState();
		}
		return PlayerState.instance;
	}
}
