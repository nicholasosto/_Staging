import Fusion, { Children, New, Value } from "@rbxts/fusion";
import { Network } from "shared/network";
import { GamePanel, GameScreen } from "../atoms";
import { CharacterInfoCard } from "../organisms";
import { CountdownTimer } from "../molecules";
import { Layout } from "../tokens";

/* =============================================== Containers ============================================= */

const LeftPanel = () =>
	GamePanel({
		Name: "LeftPanel",
		Size: new UDim2(0, 300, 1, 0),
		BackgroundTransparency: 1,
		LayoutOrder: 1,
		Children: {
			Avatar: {},
			ResourceBars: CharacterInfoCard(),
			MenuButtonBar: {},
		},
	});

const CenterPanel = () => {
	const remaining = Value(0);
	const CountdownEvent = Network.Client.Get("RoomCountdown");
	CountdownEvent.Connect((_roomId, time) => remaining.set(time));
	return GamePanel({
		Name: "CenterPanel",
		BackgroundColor3: Color3.fromRGB(50, 50, 50),
		BackgroundTransparency: 1,
		LayoutOrder: 2,
		FlexInstance: New("UIFlexItem")({
			FlexMode: Enum.UIFlexMode.Fill,
		}),
		Children: {
			ActionBar: {},
			CountdownTimer: CountdownTimer({ remaining }),
		},
	});
};
const RightPanel = () =>
	GamePanel({
		Name: "RightPanel",
		Size: new UDim2(0, 300, 1, 0),
		AnchorPoint: new Vector2(1, 0),
		Position: new UDim2(1, 0, 0, 0),
		BackgroundColor3: Color3.fromRGB(50, 50, 50),
		BackgroundTransparency: 1,
		LayoutOrder: 3,
		Children: {
			CharacterInfoCard: {},
			RightPanelButtons: {},
		},
	});

export const PlayerHUDScreen = () => {
	return GameScreen({
		Name: "PlayerHUDScreen",
		Children: {
			Layout: Layout.HorizontalSet(0),
			LeftPanel: LeftPanel(),
			CenterPanel: CenterPanel(),
			RightPanel: RightPanel(),
		},
	});
};
