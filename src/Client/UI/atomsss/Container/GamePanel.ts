/**
 * @file        GamePanel.ts
 * @module      GamePanel
 * @layer       Client/Atom
 * @description Core(Foundational Atom that serves as the base of any custom component that would use a Frame object).
 * There are additional properties that can be used to customize the component, such as scrolling, hover effects, drag functionality, and more.
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-05-29 by Trembus – Update
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 *
 * @remarks
 *   Uses them  from shared/quarks.ts.
 */

import Fusion, { New, Children, Computed, Value, OnEvent, PropertyTable } from "@rbxts/fusion";
import { GameColors, Layout, Stroke } from "../../style";
/* =============================================== GamePanel Props ========================================= */
export interface GamePanelProps extends PropertyTable<Frame> {
	BorderImage?: ImageLabel; // Optional border image for the panel
	Children?: Fusion.ChildrenValue;
	DragEnabled?: boolean; // Optional drag functionality
	FlexInstance?: UIFlexItem; // Optional flex layout
	HoverEffect?: boolean; // Optional hover effect
	Scrolling?: boolean; // Optional property to enable scrolling
	Layout?: UIListLayout | UIGridLayout; // Optional layout for scrollable children
	Padding?: UIPadding; // Optional padding for the panel
	Gradient?: UIGradient; // Optional gradient for the panel
	Stroke?: UIStroke; // Optional stroke for the panel
	OnDragStart?: () => void; // Optional callback for drag begin
	OnDragEnd?: () => void; // Optional callback for drag end
}

/* =============================================== Scroll Component ========================================= */
function ScrollContent(children: Fusion.ChildrenValue, layout?: UIListLayout | UIGridLayout) {
	return New("ScrollingFrame")({
		Name: "ScrollContent",
		BackgroundTransparency: 0.8,
		BackgroundColor3: GameColors.BackgroundDefault,
		Size: UDim2.fromScale(1, 1),
		Position: UDim2.fromScale(0, 0),
		ScrollBarThickness: 2,
		ScrollBarImageColor3: GameColors.ScrollBar,
		ScrollBarImageTransparency: 0.5,
		[Children]: {
			Layout: layout ?? Layout.Grid(10, UDim2.fromOffset(100, 100)),
			...children,
		},
	});
}

/* =============================================== Content Component ========================================= */
function Content(children: Fusion.ChildrenValue, layout?: UIListLayout | UIGridLayout) {
	return New("Frame")({
		Name: "Content",
		BackgroundTransparency: 1,
		Size: UDim2.fromScale(1, 1),
		Position: UDim2.fromScale(0, 0),
		[Children]: {
			Layout: layout ?? [],
			...children,
		},
	});
}

/* =============================================== GamePanel Component ========================================= */
export const GamePanel = (props: GamePanelProps) => {
	/* ----- State Setup ----- */
	// Hover State
	const isHovered = Value(false);

	// UI Stroke Hover Effect
	const strokeColor = Computed(() => {
		return isHovered.get() && props.HoverEffect ? GameColors.StrokeHover : GameColors.StrokeDefault;
	});

	// Stroke Thickness
	const strokeThickness = Computed(() => {
		return isHovered.get() ? 1.4 : 0.9;
	});

	// Content (Scrollable or not)
	const content = props.Scrolling
		? ScrollContent(props.Children ?? {}, props.Layout)
		: Content(props.Children ?? {}, props.Layout);

	/* ----- Component Defaults Setup ----- */
	/* -- Frame Properties -- */
	props.Name = props.Name ?? "GamePanel";
	props.AnchorPoint = props.AnchorPoint ?? new Vector2(0.5, 0.5);
	props.BackgroundColor3 = props.BackgroundColor3 ?? GameColors.BackgroundDefault;
	props.BackgroundTransparency = props.BackgroundTransparency ?? 0.2;
	props.Position = props.Position ?? UDim2.fromScale(0.5, 0.5);
	props.Size = props.Size ?? UDim2.fromScale(0.5, 0.5);
	props.LayoutOrder = props.LayoutOrder ?? 1;

	/* -- Special Properties -- */
	props.HoverEffect = props.HoverEffect ?? true; // Enable hover effect by default
	props.DragEnabled = props.DragEnabled ?? false; // Disable drag by default
	props.BorderImage = props.BorderImage ?? undefined; // No border image by default
	props.FlexInstance = props.FlexInstance ?? undefined; // No flex instance by default
	props.Padding = props.Padding ?? undefined; // No padding by default
	props.Stroke = props.Stroke ?? Stroke({ Thickness: strokeThickness, Color: strokeColor }); // No stroke by default
	props.OnDragStart = props.OnDragStart ?? (() => print("Drag started"));
	props.OnDragEnd = props.OnDragEnd ?? (() => print("Drag ended"));

	/* ----- Template ----- */
	const customComponent = New("Frame")({
		Name: props.Name,
		AnchorPoint: props.AnchorPoint,
		BackgroundColor3: props.BackgroundColor3,
		BackgroundTransparency: props.BackgroundTransparency,
		Position: props.Position,
		Size: props.Size,
		LayoutOrder: props.LayoutOrder,
		[OnEvent("MouseEnter")]: () => isHovered.set(true),
		[OnEvent("MouseLeave")]: () => isHovered.set(false),
		[Children]: {
			Gradient: props.Gradient,
			BorderImage: props.BorderImage,
			Corner: New("UICorner")({}),
			Flex: props.FlexInstance,
			Dragger: New("UIDragDetector")({
				Enabled: props.DragEnabled,
				[OnEvent("DragStart")]: props.OnDragStart,
				[OnEvent("DragEnd")]: props.OnDragEnd,
			}),
			Padding: props.Padding,
			Stroke: props.Stroke,
			Content: content,
		},
	});
	return customComponent;
};
