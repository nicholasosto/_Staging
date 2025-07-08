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
	}

	public UpdateAttributes(attributes: AttributesDTO) {
		for (const key of ATTR_KEYS) {
			const attr = this.Attributes[key];
			if (attr && attributes[key] !== undefined) {
				attr.set(attributes[key]);
			} else {
				warn(`Attribute ${key} not found in AttributesSlice or provided attributes.`);
			}
		}
		this.Available.set(attributes.AvailablePoints);
		this.Spent.set(attributes.SpentPoints);
	}

	public static getInstance(): AttributesSlice {
		if (!this.instance) {
			this.instance = new AttributesSlice();
		}
		return this.instance;
	}
}
