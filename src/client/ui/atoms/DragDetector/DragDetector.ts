// DragDetector.ts
import { New, OnEvent, Children, PropertyTable } from "@rbxts/fusion";

export interface DragDetectorEvents {
	OnDragStart?: (pos: Vector2) => void;
	OnDragContinue?: (pos: Vector2) => void;
	OnDragEnd?: (pos: Vector2) => void;
}

export type DragDetectorProps = Partial<
	Pick<
		UIDragDetector,
		| "Enabled"
		| "DragAxis"
		| "DragRelativity"
		| "BoundingUI"
		| "BoundingBehavior"
		| "DragStyle"
		| "DragSpace"
		| "ReferenceUIInstance"
	>
> &
	DragDetectorEvents &
	PropertyTable<UIDragDetector>; // pass-through for everything else

export function DragDetector(props: DragDetectorProps) {
	const { OnDragStart, OnDragContinue, OnDragEnd } = props;

	return New("UIDragDetector")({
		Name: props.Name ?? "DragDetectorZ",
		Enabled: props.Enabled ?? false,
		DragAxis: props.DragAxis ?? Vector2.one,
		DragRelativity: props.DragRelativity ?? Enum.UIDragDetectorDragRelativity.Absolute,
		DragStyle: props.DragStyle ?? Enum.UIDragDetectorDragStyle.Scriptable,
		BoundingUI: props.BoundingUI ?? undefined,

		[Children]: props[Children],

		//――――― Events ―――――――――――――――――――――――――――――――――――――――――――――――
		[OnEvent("DragStart")]: OnDragStart,
		[OnEvent("DragContinue")]: OnDragContinue,
		[OnEvent("DragEnd")]: OnDragEnd,
	});
}
