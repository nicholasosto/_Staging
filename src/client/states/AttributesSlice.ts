/// <reference types="@rbxts/types" />

/**
 * @file        AttributesSlice.ts
 * @module      AttributesSlice
 * @layer       Client/State
 * @description Reactive container for player attribute values.
 */

import { Value } from "@rbxts/fusion";
import {
	ATTR_KEYS,
	AttributeKey,
	AttributesDTO,
	DefaultAttributes,
} from "shared/definitions/ProfileDefinitions/Attributes";
import { ServerDispatch } from "shared/network/Definitions";
import { CNet } from "client/network/ClientNetworkService";

export default class AttributesSlice {
	private static instance: AttributesSlice;

	public readonly Attributes: Record<AttributeKey, Value<number>> = {} as never;
	public readonly Available = Value(0);
	public readonly Spent = Value(0);

	private constructor() {
		for (const key of ATTR_KEYS) {
			this.Attributes[key] = Value(DefaultAttributes[key]);
		}
		this.Available.set(DefaultAttributes.AvailablePoints);
		this.Spent.set(DefaultAttributes.SpentPoints);
		this.fetchFromServer();
		this.setupListeners();
	}

	private async fetchFromServer() {
		const attrs = (await CNet.GetProfileData("Attributes")) as AttributesDTO | undefined;
		if (attrs) {
			for (const key of ATTR_KEYS) {
				this.Attributes[key].set(attrs[key]);
			}
			this.Available.set(attrs.AvailablePoints);
			this.Spent.set(attrs.SpentPoints);
		}
	}

	private setupListeners() {
		ServerDispatch.Client.Get("AttributesUpdated").Connect((data) => {
			for (const key of ATTR_KEYS) {
				this.Attributes[key].set(data[key]);
			}
			this.Available.set(data.AvailablePoints);
			this.Spent.set(data.SpentPoints);
		});
	}

	public static getInstance(): AttributesSlice {
		if (!this.instance) {
			this.instance = new AttributesSlice();
		}
		return this.instance;
	}
}
