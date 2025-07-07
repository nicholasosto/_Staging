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

function createRopeConstraint(
	model: Model,
	attachment0: Attachment,
	attachment1?: Attachment,
	length: number = 10,
	thickness: number = 0.2,
): RopeConstraint {
	const rope = new Instance("RopeConstraint");
	rope.Name = "RopeToRightAnkle";
	rope.Attachment0 = attachment0;
	rope.Attachment1 = attachment1;
	rope.WinchEnabled = true;
	rope.Length = length; // Set the length of the rope
	rope.WinchTarget = 0; // Set the winch target to 0 to keep the rope taut
	rope.Visible = true; // Make the rope visible for debugging
	rope.Color = new BrickColor("Bronze");
	rope.Thickness = thickness; // Set the thickness of the rope
	rope.Restitution = 0.5; // Set the restitution for some bounce
	rope.WinchResponsiveness = 22;
	rope.Enabled = false; // Enable the rope constraint
	rope.Parent = model.PrimaryPart;

	return rope;
}

export class SpawnModel implements SpawnModelInterface {
	Name: string;
	Position?: Vector3;
	Attachment: Attachment;
	Rope: RopeConstraint;
	public readonly Model: Model;

	constructor(name: string, position: Vector3) {
		this.Name = name;
		this.Position = position;
		this.Model = createModelNamed(name, position);
		this.Attachment = new Instance("Attachment");
		this.Attachment.Name = "RightAnkleRigAttachment";
		this.Attachment.Parent = this.Model.PrimaryPart;

		this.Rope = createRopeConstraint(this.Model, this.Attachment);

		const attachment = new Instance("Attachment");
		attachment.Name = "RightAnkleAttachment";
		attachment.Parent = this.Model.PrimaryPart;
		this.Attachment = attachment;
		const primaryPart = this.Model.PrimaryPart as Part;
		if (primaryPart === undefined) {
			warn(`PrimaryPart is not set for model ${this.Model.Name}`);
			return;
		}

		primaryPart.Touched.Connect((other: BasePart) => {
			warn(`Attaching rope to ${other.Name}`);
			if (other.Parent !== undefined && other.Parent.IsA("Model")) {
				const ankleAttachment = other.Parent.FindFirstChild("RightAnkleRigAttachment", true) as Attachment;
				this.Rope.Attachment1 = ankleAttachment;
				this.Rope.Enabled = true; // Enable the rope constraint when touched
				task.delay(2, () => {
					this.Rope.Enabled = false; // Disable the rope constraint after 2 seconds
					warn(`Rope constraint disabled for model ${this.Model.Name}`);
				});
			}
		});
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
