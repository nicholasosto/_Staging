import { TweenService } from "@rbxts/services";

const defaultTweenInfo = new TweenInfo(2.0, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, true, 0);

export interface SpawnModelInterface {
	Name: string;
	Position?: Vector3;
}

function createModelNamed(name: string, position: Vector3) {
	const model = new Instance("Model");
	model.Name = name;
	const primaryPart = new Instance("Part");
	primaryPart.Name = name + "PrimaryPart";
	primaryPart.Size = new Vector3(15, 5, 15);
	primaryPart.Position = position;
	primaryPart.Anchored = true;
	primaryPart.Parent = model;
	model.PrimaryPart = primaryPart;
	return model;
}

export class SpawnModel implements SpawnModelInterface {
	Name: string;
	Position?: Vector3;
	public readonly Model: Model;

	constructor(name: string, position: Vector3) {
		this.Name = name;
		this.Position = position;
		this.Model = createModelNamed(name, position);
	}

	public GrowModel(scale: number) {
		const primaryPart = this.Model.PrimaryPart;
		if (primaryPart === undefined) {
			warn(`PrimaryPart is not set for model ${this.Model.Name}`);
			return;
		}
		const GrowTween = TweenService.Create(primaryPart, defaultTweenInfo, { Size: primaryPart.Size.mul(scale) });
		GrowTween.Play();
		GrowTween.Completed.Connect(() => {
			print(`Model ${this.Model.Name} grown by a factor of ${scale}`);
		});
	}
	public SetPosition(position: Vector3) {
		const primaryPart = this.Model.PrimaryPart as Part;
		if (primaryPart === undefined) {
			warn(`PrimaryPart is not set for model ${this.Model.Name}`);
			return;
		}
		const time = position.sub(primaryPart.Position).Magnitude / 20;
		const tweenInfo = new TweenInfo(time, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, false, 0);
		//primaryPart.Anchored = false; // Ensure the part is not anchored before moving
		const MoveTween = TweenService.Create(primaryPart, tweenInfo, { Position: position });
		MoveTween.Play();
		MoveTween.Completed.Connect(() => {
			print(`Model ${this.Model.Name} moved to ${position}`);
			primaryPart.Color = new Color3(math.random(), math.random(), math.random()); // Change color on move
			const shapeOptions = [Enum.PartType.Block, Enum.PartType.Cylinder, Enum.PartType.Ball];
			const newShape = shapeOptions[math.random(1, shapeOptions.size()) - 1]; // Randomly select a shape
			primaryPart.Shape = newShape; // Randomly change shape
			primaryPart.Anchored = false; // Re-enable physics after moving
		});
	}
}
