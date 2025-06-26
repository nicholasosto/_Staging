import { Workspace } from "@rbxts/services";

const ACTION_KEY = ["Rest", "Hunt", "Explore"] as const;
export type ActionKey = (typeof ACTION_KEY)[number];
export type ActionBiasMap = {
	[K in ActionKey]: number;
};

export class AlienOrganism {
	public readonly AlienModel: Model = new Instance("Model");
	public readonly Alive = true; // Indicates if the organism is alive
	public readonly Health = 100; // Represents the health of the organism
	public readonly Energy = 100; // Represents the energy of the organism

	public readonly ActionBias = {
		Rest: 0.5, // Bias towards resting
		Hunt: 0.3, // Bias towards hunting for resources
		Explore: 0.2, // Bias towards exploring
	};

	constructor(name: string, cframe: CFrame) {
		this.AlienModel.Name = name;

		const primaryPart = new Instance("Part");
		primaryPart.Name = "AlienPrimaryPart";
		primaryPart.Size = new Vector3(22, 22, 22);
		primaryPart.Anchored = true;
		primaryPart.CanCollide = false;
		primaryPart.BrickColor = BrickColor.random();
		primaryPart.Material = Enum.Material.Plastic;

		// Set the primary part of the model
		primaryPart.Parent = this.AlienModel;
		this.AlienModel.Parent = game.Workspace;

		// Pivot the model to the specified CFrame
		this.AlienModel.PivotTo(cframe);
		warn(`AlienOrganism created: ${this.AlienModel.Name} at: `, this.AlienModel.GetPivot().Position);
	}
}
