import Fusion, { Computed, OnEvent, Value } from "@rbxts/fusion";
import { GameColors, GlassGradient, TextSizes, Theme } from "client/ui/style";

export interface GameTextProps extends Fusion.PropertyTable<TextLabel> {
	ShadowBox?: boolean;
	Title?: boolean;
}

export function GameText(props: GameTextProps): TextLabel {
	const HoveredState = Value(false);
	const TextValue = Value(props.Text ?? "Default Text");

	const TextStrokeProps: Partial<GameTextProps> = {
		TextStrokeTransparency: Computed(() => (HoveredState.get() ? 0 : 0.5)).get(),
		TextStrokeColor3: Computed(() =>
			HoveredState.get() ? GameColors.StrokeHover : GameColors.StrokeDefault,
		).get(),
	};

	const GameTextComponent = Fusion.New("TextLabel")({
		Name: props.Name ?? "GameText",
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		Position: props.Position ?? UDim2.fromScale(0.5, 0.5),
		Size: props.Size ?? UDim2.fromScale(1, 1),
		BackgroundColor3: props.BackgroundColor3 ?? GameColors.BackgroundDefault,
		BackgroundTransparency: props.BackgroundTransparency ?? 1,
		Text: Computed(() => TextValue.get()).get(),
		TextColor3: props.TextColor3 ?? GameColors.TextDefault,
		TextSize: props.TextSize ?? TextSizes.Default,
		TextWrapped: props.TextWrapped ?? false,
		TextXAlignment: props.TextXAlignment ?? Enum.TextXAlignment.Center,
		TextYAlignment: props.TextYAlignment ?? Enum.TextYAlignment.Center,
		ZIndex: props.ZIndex ?? 1,
		/* TextStroke properties */
		...TextStrokeProps,
		[OnEvent("MouseEnter")]: () => HoveredState.set(true),
		[OnEvent("MouseLeave")]: () => HoveredState.set(false),
	});

	return GameTextComponent;
}
