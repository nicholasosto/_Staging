export class EntityResource {
	public model: Model;
	public part: Part;
	public amount: number;
	private connectionPartTouched: RBXScriptConnection | undefined;

	constructor(model: Model, amount: number) {
		this.model = model;
		this.part = (model?.PrimaryPart as Part) || new Instance("Part");
		this.amount = amount;

		this.connectionPartTouched?.Disconnect(); // Disconnect any previous connection to avoid memory leaks
		this.connectionPartTouched = this.part.Touched.Connect((hit: BasePart) => {
			print(`Resource touched by: ${hit.Name}`);
			if (hit.Parent && hit.Parent.IsA("Model")) {
				print(`Resource touched by: ${hit.Parent.Name}`);
				this.UpdateResource(-10); // Decrease resource amount on touch
			}
		});
		print(`EntityResource created with amount: ${this.amount}`);
		this.model.Parent = game.Workspace; // Add the model to the workspace
	}

	public static SpawnResource(location: CFrame): EntityResource {
		const amount = math.random(1, 100); // Random amount of resource

		const model = new Instance("Model");
		model.Name = "Resource";
		const part = new Instance("Part");
		part.Name = "ResourcePart";
		part.Size = new Vector3(5, 5, 5);
		part.Color = Color3.fromRGB(0, 255 * (amount / 100), 0); // Green color for resources
		part.Transparency = 0.5;
		part.Anchored = true;
		part.CanCollide = false;
		part.CanTouch = true; // Enable touch events
		part.Parent = model;

		model.PrimaryPart = part;
		model.PivotTo(location); // Set the model's position
		const resource = new EntityResource(model, amount);
		return resource;
	}

	private UpdateResource(amount: number): void {
		this.amount += amount;
		this.part.Color = Color3.fromRGB(0, 255 * (this.amount / 100), 0); // Update color based on new amount
		if (this.amount <= 0) {
			this.connectionPartTouched?.Disconnect(); // Disconnect the touch event
			this.model.Destroy(); // Remove the resource if amount is zero or less
		}
		print(`Resource amount updated: ${this.amount}`);
	}
}
