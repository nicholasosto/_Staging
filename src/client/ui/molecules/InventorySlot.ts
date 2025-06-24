// /// <reference types="@rbxts/types" />

// /**
//  * @file        InventorySlot.ts
//  * @module      InventorySlot
//  * @layer       Client/Molecule
//  * @description Clickable, draggable slot for the Soul Steel inventory grid.
//  *              ┌─ RarityBorder (nine-slice)
//  *              │  ┌─ ItemIcon
//  *              │  └─ QuantityLabel
//  *              └─ Hover / Press / Drag visuals
//  *
//  * ╭───────────────────────────────╮
//  * │  Soul Steel · Coding Guide    │
//  * │  Fusion v4 · Strict TS · ECS  │
//  * ╰───────────────────────────────╯
//  *
//  * @author       Trembus
//  * @license      MIT
//  * @since        0.2.0
//  *
//  * @dependencies
//  *   @rbxts/fusion ^0.4.0
//  */

// import Fusion, { New, Children, Value, Computed, Spring, OnEvent } from "@rbxts/fusion";
// import { ItemDTO } from "shared";

// const { Value: createValue, Computed: createComputed, Spring: createSpring, New: create, Children: attach } = Fusion;

// export interface InventorySlotProps {
// 	item: Value<ItemDTO | undefined>;
// 	Position?: UDim2;
// 	Size?: UDim2;
// 	onClick?: (slot: Frame, item?: ItemDTO) => void;
// 	onDragEnd?: (from: Frame, item: ItemDTO, dropTarget: Frame) => void;
// }

// /** Public constructor – import and drop into your ForPairs grid. */
// export function InventorySlot(props: InventorySlotProps) {
// 	const { item, Position, Size, onClick, onDragEnd } = props;

// 	/* ------------------------------------------------------------------ */
// 	/*  Reactive state                                                    */
// 	/* ------------------------------------------------------------------ */
// 	const isHovered = createValue(false);
// 	const isPressed = createValue(false);

// 	const scale = createSpring(
// 		createComputed(() => (isPressed.get() ? 1.04 : isHovered.get() ? 1.02 : 1)),
// 		35,
// 		0.75,
// 	);

// 	const imageId = createComputed(() => {
// 		const itm = item.get();
// 		return itm ? `rbxassetid://${itm.ItemId}` : "rbxassetid://0";
// 	});
// 	const qty = createComputed(() => item.get()?.Qty ?? 0);
// 	const rarity = createComputed(() => item.get()?.Rarity ?? "Common");
// 	const brdColor = createComputed(() => RarityMeta[rarity.get()].color);
// 	const frameId = createComputed(() => RarityMeta[rarity.get()].BorderImage);

// 	/* ------------------------------------------------------------------ */
// 	/*  Drag proxy                                                        */
// 	/* ------------------------------------------------------------------ */
// 	const playerGui = game.GetService("Players").LocalPlayer!.WaitForChild("PlayerGui") as PlayerGui;
// 	const dragProxy = create("ImageLabel")({
// 		Name: "DragProxy",
// 		BackgroundTransparency: 1,
// 		Size: Size,
// 		Image: imageId,
// 		ImageTransparency: createComputed(() => (item.get() ? 0 : 1)),
// 		Visible: false,
// 		Parent: playerGui,
// 	});

// 	/* ------------------------------------------------------------------ */
// 	/*  Main slot frame                                                   */
// 	/* ------------------------------------------------------------------ */
// 	const slotFrame = create("Frame")({
// 		Name: "InventorySlot",
// 		BackgroundTransparency: 1,
// 		Position,
// 		Size,

// 		[attach]: [
// 			/* ── Border ─────────────────────────────────────────── */
// 			create("ImageLabel")({
// 				Name: "Border",
// 				BackgroundTransparency: 1,
// 				Size: UDim2.fromScale(1, 1),
// 				Image: frameId,
// 				ImageColor3: brdColor,
// 				ScaleType: Enum.ScaleType.Slice,
// 				SliceCenter: new Rect(32, 32, 96, 96),
// 				ImageTransparency: createComputed(() => (isHovered.get() ? 0 : 0.1)),
// 			}),

// 			/* ── Icon ───────────────────────────────────────────── */
// 			create("ImageLabel")({
// 				Name: "Icon",
// 				BackgroundTransparency: 1,
// 				Size: UDim2.fromScale(0.9, 0.9),
// 				Position: UDim2.fromScale(0.5, 0.5),
// 				AnchorPoint: new Vector2(0.5, 0.5),
// 				Image: imageId,
// 				ScaleType: Enum.ScaleType.Crop,
// 				ImageTransparency: createComputed(() => (item.get() ? 0 : 1)),
// 			}),

// 			/* ── Quantity badge ────────────────────────────────── */
// 			create("TextLabel")({
// 				Name: "Quantity",
// 				AnchorPoint: new Vector2(1, 1),
// 				Position: UDim2.fromScale(1, 1),
// 				Size: UDim2.fromOffset(0, 0), // auto-fit via TextScaled
// 				BackgroundTransparency: 1,
// 				TextScaled: true,
// 				FontFace: new Font("rbxasset://fonts/families/GothamSSm.json", Enum.FontWeight.Bold),
// 				TextColor3: Color3.fromRGB(255, 255, 255),
// 				TextStrokeTransparency: 0.6,
// 				Text: createComputed(() => (qty.get() > 1 ? `${qty.get()}` : "")),
// 			}),

// 			/* ── Stroke for subtle glow on hover ───────────────── */
// 			create("UIStroke")({
// 				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
// 				Color: brdColor,
// 				Thickness: 1,
// 				Transparency: createComputed(() => (isHovered.get() ? 0.4 : 1)),
// 			}),

// 			/* ── Scale anim ────────────────────────────────────── */
// 			create("UIScale")({ Scale: scale }),
// 		],

// 		/* ------------------------------------------------------ */
// 		/*  Interaction hooks                                     */
// 		/* ------------------------------------------------------ */
// 		[OnEvent("MouseEnter")]: () => isHovered.set(true),
// 		[OnEvent("MouseLeave")]: () => {
// 			isHovered.set(false);
// 			isPressed.set(false);
// 		},

// 		// [OnEvent("Activated")]: () => onClick?.(slotFrame, item.get()),

// 		// [OnEvent("MouseButton1Down")]: () => isPressed.set(true),
// 		[OnEvent("InputEnded")]: (io: InputObject) => {
// 			if (io.UserInputType === Enum.UserInputType.MouseButton1) isPressed.set(false);
// 		},

// 		/* --- Drag-and-drop – lightweight & local-only for now -- */
// 		[OnEvent("InputBegan")]: (io: InputObject) => {
// 			if (io.UserInputType !== Enum.UserInputType.MouseButton1 || !item.get()) return;

// 			/* Track until mouse/button released */
// 			const runSvc = game.GetService("RunService");
// 			const mouse = game.GetService("Players").LocalPlayer!.GetMouse();
// 			const renderCn = runSvc.RenderStepped.Connect(() => {
// 				dragProxy.Visible = true;
// 				const size = Size ?? UDim2.fromOffset(50, 50); // Ensure size is set
// 				dragProxy.Position = UDim2.fromOffset(mouse.X - size.X.Offset / 2, mouse.Y - size.Y.Offset / 2);
// 			});

// 			const endConn = io.AttributeChanged.Connect(() => {
// 				if (io.UserInputState !== Enum.UserInputState.End) return;
// 				/* Stop following */
// 				renderCn.Disconnect();
// 				dragProxy.Visible = false;

// 				/* Detect drop target */
// 				const target = getSlotUnderMouse();
// 				if (target && target !== slotFrame && onDragEnd) {
// 					onDragEnd(slotFrame, item.get()!, target);
// 				}
// 				endConn.Disconnect();
// 			});
// 		},
// 	});

// 	return slotFrame;
// }

// /* -------------------------------------------------------------------------- */
// /*  Helpers                                                                   */
// /* -------------------------------------------------------------------------- */
// function getSlotUnderMouse(): Frame | undefined {
// 	const localPlayer = game.GetService("Players").LocalPlayer!;
// 	const playerGui = localPlayer.WaitForChild("PlayerGui") as PlayerGui;
// 	const mouse = localPlayer.GetMouse();
// 	const pos = new Vector2(mouse.X, mouse.Y);

// 	for (const guiObj of playerGui.GetDescendants()) {
// 		if (!guiObj.IsA("Frame") || guiObj.Name !== "InventorySlot") continue;
// 		const { X, Y } = guiObj.AbsolutePosition;
// 		const { X: w, Y: h } = guiObj.AbsoluteSize;
// 		if (pos.X >= X && pos.X <= X + w && pos.Y >= Y && pos.Y <= Y + h) return guiObj;
// 	}
// 	return undefined;
// }
