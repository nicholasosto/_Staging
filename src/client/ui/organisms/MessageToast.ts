/// <reference types="@rbxts/types" />

/**
 * MessageToast.ts  – Fusion molecule for transient player messages
 */
import Fusion, { Computed, Value, Children, Observer } from "@rbxts/fusion";
import { BaseContainer, GameText, Badge, BorderImage, ListContainer } from "client/ui/atoms";
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
	const severityEmoji = Computed(() => {
		switch (props.Message.get()?.severity) {
			case "info":
				return "ℹ️";
			case "warning":
				return "⚠️";
			case "error":
				return "❗";
			case "success":
				return "✅";
			case "prompt":
				return "❓";
			default:
				return "ℹ️"; // Default to info if severity is unknown
		}
	});
	const severityLabel = Value(severityEmoji.get());

	/* ---------- UI tree ---------- */
	const toast = BaseContainer({
		Name: "MessageToast",
		Size: UDim2.fromOffset(500, 300), // autosize Y
		AnchorPoint: new Vector2(0.5, 0),
		Position: UDim2.fromScale(0.5, 0.08),
		BackgroundTransparency: 0.15,
		BorderImage: BorderImage.GothicMetal(), // coloured frame
		Content: {
			/* -- Badge for severity -- */
			Badge: Badge({
				TextValue: severityLabel, // Computed<T> also works
				Corner: "TopRight",
				BackgroundColor3: props.Message.get()?.textColor ?? new Color3(1, 1, 1), // Default to white
				OnClick: () => {
					show.set(false); // Hide toast on click
				}
			}),
			LayoutContainer: ListContainer({
				LayoutOrientation: "vertical",
				Gap: 5,
				Content: {
					/* -- Title and Body -- */
					Title: GameText({
						TextState: title,
						Size: UDim2.fromScale(1, 0.3), // autosize X
						TextSize: 20,
						TextScaled: false,
						LayoutOrder: 1,
					}),
					Body: GameText({
						Size: UDim2.fromScale(1, 0.7), // autosize X
						TextState: body,
						TextSize: 16,
						TextScaled: false,
						TextColor3: props.Message.get()?.textColor ?? new Color3(1, 1, 1), // Default to white
						LayoutOrder: 2,
					}),
				},
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
