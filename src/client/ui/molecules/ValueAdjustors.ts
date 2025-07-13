/**
 * @File ValueAdjustors.ts
 * @Module ValueAdjustors
 * @Layer Client/UI/Molecules
 * @Description Incrementor, Decrementor, CombinedAdjustor, Reset, and Setter components for managing numeric values in the UI.
 * @Version 1.0.0
 * @License MIT
 */

import Fusion, { Computed, Value } from "@rbxts/fusion";
import { GameText, ListContainer, UIButton } from "client/ui/atoms";
import { GameImages } from "shared";

/* ----------------------------- Incrementor Component ----------------------------- */
export interface IncrementorProps {
	value: Value<number>;
	amount?: number;
	OnIncrement?: () => void;
	Validator: () => boolean;
	LayoutOrder?: number;
}

export const Incrementor = (props: IncrementorProps) => {
	const { value, amount = 1, OnIncrement, LayoutOrder } = props;

	const Component = UIButton({
		Size: new UDim2(0, 35, 0, 35),
		Icon: GameImages.Control.Increment,
		LayoutOrder: LayoutOrder,
		OnClick: () => {
			if (props.Validator() === false) {
				return;
			}
			OnIncrement?.();
		},
	});
	return Component;
};

/* ----------------------------- Decrementor Component ----------------------------- */
export interface DecrementorProps {
	value: Value<number>;
	amount?: number;
	OnDecrement?: () => void;
	Validator: () => boolean;
	LayoutOrder?: number;
}
export const Decrementor = (props: DecrementorProps) => {
	const { value, amount = 1, OnDecrement, LayoutOrder } = props;

	const Component = UIButton({
		Size: new UDim2(0, 35, 0, 35),
		Icon: GameImages.Control.Decrement,
		LayoutOrder: LayoutOrder,
		OnClick: () => {
			if (props.Validator() === false) {
				return;
			}
			OnDecrement?.();
		},
	});
	return Component;
};

/* ----------------------------- CombinedAdjustor Component ----------------------------- */
export interface CombinedAdjustorProps {
	Size?: UDim2;
	LayoutOrder?: number;
	value: Value<number>;
	amount?: number;
	displayValue?: boolean; // If true, shows the value in the middle
	OnIncrement?: () => void;
	OnDecrement?: () => void;
}
export const CombinedAdjustor = (props: CombinedAdjustorProps) => {
	const { value, amount = 1, displayValue = false, OnIncrement, OnDecrement } = props;

	const stringValue = Value(tostring(value.get()));

	const IncrementButton = UIButton({
		Size: new UDim2(0, 35, 1, 0),
		Icon: GameImages.Control.Increment,
		LayoutOrder: 0,
		RatioValue: 1,
		OnClick: () => {
			props.OnIncrement?.();
		},
	});

	const DecrementButton = UIButton({
		Size: new UDim2(0, 35, 1, 0),
		Icon: GameImages.Control.Decrement,
		LayoutOrder: 0,
		RatioValue: 1,
		OnClick: () => {
			props.OnDecrement?.();
		},
	});

	const ValueDisplay = GameText({
		LayoutOrder: 1,
		Size: new UDim2(0, 35, 1, 0),
		TextState: stringValue,
	});

	const container = ListContainer({
		Name: "CombinedAdjustor",
		LayoutOrientation: "horizontal",
		Size: new UDim2(0, 110, 1, 0),
		LayoutOrder: props.LayoutOrder ?? 0,
		Gap: 10,
		Content: {
			Incrementor: IncrementButton,
			ValueDisplay: displayValue === true ? ValueDisplay : undefined,
			Decrementor: DecrementButton,
		},
	});

	return container;
};
