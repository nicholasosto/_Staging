/// <reference types="@rbxts/types" />

/**
 * MessageToast.ts  – Fusion molecule for transient player messages
 */
import Fusion, { Computed, Value, Children, Observer } from "@rbxts/fusion";
import { BaseContainer, GameText, Badge, BorderImage } from "client/ui/atoms";
import { MessageShape } from "shared/definitions/Message";

export interface MessageToastProps {
	/** Reactive pointer to the current message (or undefined when idle) */
	Message: Value<MessageShape | undefined>;
	/** Seconds before the toast disappears */
	Duration?: number;
}

/** Returns a Computed<Frame | undefined> that you can mount inside a ScreenGui */
export function MessageToast(props: MessageToastProps) {
	const show = Value(false);

	const title = Computed(() => props.Message.get()?.title ?? "");
	const body = Computed(() => props.Message.get()?.content ?? "");
	const severityLabel = Value((props.Message.get()?.severity ?? "").upper().sub(0, 3));

	/* ---------- UI tree ---------- */
	const toast = BaseContainer({
		Name: "MessageToast",
		Size: UDim2.fromScale(0.35, 0), // autosize Y
		AutomaticSize: Enum.AutomaticSize.Y,
		AnchorPoint: new Vector2(0.5, 0),
		Position: UDim2.fromScale(0.5, 0.08),
		BackgroundTransparency: 0.15,
		BorderImage: BorderImage.GothicMetal(), // coloured frame
		Content: {
			Title: GameText({
				TextState: title,
				TextSize: 20,
				LayoutOrder: 1,
			}),
			Body: GameText({
				TextState: body,
				TextSize: 16,
				LayoutOrder: 2,
			}),
			Badge: Badge({
				TextValue: severityLabel, // Computed<T> also works
				Corner: "TopRight",
			}),
		},
	});

	/* ---------- lifecycle ---------- */
	Observer(props.Message).onChange(() => {
		if (!props.Message.get()) {
			show.set(false);
			return;
		}
		show.set(true);
	});
	/* Mount/unmount by returning a Computed */
	return Computed(() => (show.get() ? toast : undefined));
}
