/**
 * @File ValueAdjustors.ts
 * @Module ValueAdjustors
 * @Layer Client/UI/Molecules
 * @Description Incrementor, Decrementor, CombinedAdjustor, Reset, and Setter components for managing numeric values in the UI.
 * @Version 1.0.0
 * @License MIT
 */

import Fusion, { Computed, Value } from "@rbxts/fusion";
import { GameText, HorizontalContainer, UIButton } from "client/ui/atoms";
import { GameImages } from "shared";

/* ----------------------------- Incrementor Component ----------------------------- */
export interface IncrementorProps {
	value: Value<number>;
	amount?: number;
	OnIncrement?: () => void;
	LayoutOrder?: number;
}

export const Incrementor = (props: IncrementorProps) => {
	const { value, amount = 1, OnIncrement, LayoutOrder } = props;

	const Component = UIButton({
		Size: new UDim2(0, 50, 0, 50),
		Icon: GameImages.Control.Increment,
		LayoutOrder: LayoutOrder,
		OnClick: () => {
			value.set(value.get() + amount);
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
	LayoutOrder?: number;
}
export const Decrementor = (props: DecrementorProps) => {
	const { value, amount = 1, OnDecrement, LayoutOrder } = props;

	const Component = UIButton({
		Size: new UDim2(0, 50, 0, 50),
		Icon: GameImages.Control.Decrement,
		LayoutOrder: LayoutOrder,
		OnClick: () => {
			value.set(value.get() - amount);
			OnDecrement?.();
		},
	});
	return Component;
};

/* ----------------------------- CombinedAdjustor Component ----------------------------- */
export interface CombinedAdjustorProps {
	LayoutOrder?: number;
	value: Value<number>;
	amount?: number;
	OnIncrement?: () => void;
	OnDecrement?: () => void;
}
export const CombinedAdjustor = (props: CombinedAdjustorProps) => {
	const { value, amount = 1, OnIncrement, OnDecrement } = props;

	const stringValue = Value(tostring(value.get()));

	const IncrementButton = Incrementor({ value, amount, OnIncrement, LayoutOrder: 2 });
	const ValueDisplay = GameText({
		LayoutOrder: 1,
		Size: new UDim2(0, 50, 0, 50),
		TextStateValue: stringValue,
	});
	const DecrementButton = Decrementor({ value, amount, OnDecrement, LayoutOrder: 0 });

	const container = HorizontalContainer({
		Size: new UDim2(0, 100, 0, 50),
		LayoutOrder: props.LayoutOrder,
		Gap: 10,
		Content: {
			Incrementor: IncrementButton,
			ValueDisplay: ValueDisplay,
			Decrementor: DecrementButton,
		},
	});

	return container;
};
