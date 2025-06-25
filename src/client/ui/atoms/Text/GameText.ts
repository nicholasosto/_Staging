import Fusion, { Computed, OnEvent, Value } from "@rbxts/fusion";
import { useToken, useFont } from "theme/hooks";

export interface GameTextProps extends Fusion.PropertyTable<TextLabel> {
	ShadowBox?: boolean;
	Title?: boolean;
}

export function GameText(props: GameTextProps): TextLabel {
        const HoveredState = Value(false);
        const TextValue = Value(props.Text ?? "Default Text");
        const colour = useToken("textPrimary");
        const font = useFont();

        const GameTextComponent = Fusion.New("TextLabel")({
                Name: props.Name ?? "GameText",
                AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
                Position: props.Position ?? UDim2.fromScale(0.5, 0.5),
                Size: props.Size ?? UDim2.fromScale(0.5, 0.5),
                TextColor3: colour,
                Font: Computed(() => font.get().family),

                /* TextStroke properties */
                //...TextStrokeProps,
                [OnEvent("MouseEnter")]: () => HoveredState.set(true),
                [OnEvent("MouseLeave")]: () => HoveredState.set(false),
        });

	return GameTextComponent;
}
