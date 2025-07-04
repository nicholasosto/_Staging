import Fusion, { ForValues } from "@rbxts/fusion";
import { Padding } from "client/ui/tokens";
import { StatusEffect } from "shared/definitions/StatusEffect";
const { New, Children, Value, Computed, Spring, ForPairs, OnEvent } = Fusion;

// ==== Atoms ================================================================
const StatusIcon = (icon: string) =>
	New("ImageLabel")({
		BackgroundTransparency: 1,
		Image: icon,
		Size: UDim2.fromScale(0.2, 1),
		[Children]: [New("UICorner")({}), New("UIAspectRatioConstraint")({})],
	});

const StatusText = (display: Fusion.Computed<string>) =>
	New("TextLabel")({
		BackgroundTransparency: 1,
		FontFace: new Font("rbxasset://fonts/families/Merriweather.json"),
		RichText: true,
		Size: UDim2.fromOffset(200, 50),
		Text: display,
		TextColor3: Color3.fromRGB(244, 244, 244),
		TextSize: 17,
		TextStrokeTransparency: 0,
		[Children]: [New("UIFlexItem")({ FlexMode: Enum.UIFlexMode.Shrink })],
	});

const Badge = (count: Fusion.Computed<number>, toggle: () => void) =>
	New("ImageButton")({
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: UDim2.fromOffset(120, 0),
		Size: UDim2.fromOffset(32, 24),
		AutoButtonColor: true,
		BackgroundTransparency: 1,
		Image: "rbxassetid://8672979592", // any rounded‑rect orange badge slice you use elsewhere
		[OnEvent("Activated")]: toggle,
		[Children]: [
			New("TextLabel")({
				AnchorPoint: new Vector2(0.5, 0.5),
				Position: UDim2.fromScale(0.5, 0.5),
				BackgroundTransparency: 1,
				Font: Enum.Font.GothamBlack,
				TextColor3: Color3.fromRGB(255, 255, 255),
				TextSize: 18,
				Text: Computed(() => tostring(count.get())),
			}),
		],
	});

// ==== Molecule =============================================================
const StatusRow = (effect: StatusEffect) => {
	const display = Computed(
		() => `${effect.meta.displayName} (<font color="#FF7800">${effect.startTime - tick()}</font>s)`,
	);

	return New("Frame")({
		Name: effect.meta.displayName,
		Size: UDim2.fromScale(1, 0.2),
		AutomaticSize: Enum.AutomaticSize.Y,
		BackgroundColor3: Color3.fromRGB(242, 255, 161),
		BackgroundTransparency: 0.7,
		BorderSizePixel: 0,
		[Children]: [
			StatusIcon(effect.meta.iconId),
			StatusText(display),
			Padding(2),
			New("UIListLayout")({
				FillDirection: Enum.FillDirection.Horizontal,
				SortOrder: Enum.SortOrder.LayoutOrder,
				ItemLineAlignment: Enum.ItemLineAlignment.Center,
				HorizontalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			}),
		],
	});
};

// ==== Organism =============================================================
export const StatusPanel = (statusArray: Fusion.Value<StatusEffect[]>) => {
	const expanded = Value(false);

	// Sizes (animated)
	const height = Spring(
		Computed(() => (expanded.get() ? 200 : 20)),
		40,
		1,
	);
	const clipDescendants = Computed(() => !expanded.get()); // hide rows when collapsed

	// Derived values
	const count = Computed(() => statusArray.get().size());

	// Toggle helper
	const toggle = () => expanded.set(!expanded.get());

	return New("Frame")({
		Size: Computed(() => UDim2.fromOffset(120, height.get())),
		AnchorPoint: new Vector2(1, 0),
		Position: Computed(() => UDim2.fromScale(1, 0.5)),
		Name: "StatusPanel",
		BackgroundTransparency: 1,
		ClipsDescendants: clipDescendants,

		[Children]: [
			// Scroll / list area
			New("ScrollingFrame")({
				Name: "StatusList",
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				ScrollBarThickness: 4,
				AutomaticCanvasSize: Enum.AutomaticSize.Y,
				ScrollingDirection: Enum.ScrollingDirection.Y,
				Visible: expanded,

				[Children]: [
					// One StatusRow per effect
					ForValues(statusArray, (effect) => {
						return StatusRow(effect);
					}),

					// vertical layout within scrolling frame
					New("UIListLayout")({
						FillDirection: Enum.FillDirection.Vertical,
						SortOrder: Enum.SortOrder.LayoutOrder,
					}),
				],
			}),

			// Floating badge / toggle
			Badge(count, toggle),
		],
	});
};
