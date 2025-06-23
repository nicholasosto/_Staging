# AGENTS.md

The purpose of this document is to provide a concise overview of coding conventions, testing practices, and agent directives for the Soul Steel project. It serves as a quick reference for developers and LLM or AGI's to ensure consistency and quality in their contributions.

## 1 Follow Coding Conventions

1. Use PascalCase for FusionComponents.
2. Section modules with spanning comment blocks.

## 2 General Workflow

1. **Follow coding conventions** in this guide.
2. Ensure folders contain barrel files for easy imports. Check existing folders and ensure barrel files are present and correctly exporting components.
3. Use available assets from the `shared/assets` folder. If an asset is not available, create a placeholder asset and a #ASSETREQUEST comment in the code to request the asset from the art team.
4. If you identify a core (atomic) component that is missing, create a new file in the `src/atoms` folder and follow the coding conventions outlined in this guide. add a #AGENT_ATOM comment to the top of the file to indicate it is an agent-created atom.
5. **Testing**: All components should be testable. Use the `TestParts` screen to add example tests for new components. Ensure that tests cover the expected behavior and edge cases of the component.
6. Create a const export for simple example components when a new component is created. This allows for easy testing and demonstration of the component's functionality.
7. **Documentation**: Use TSDoc comments to document components, including their purpose, properties, and events. This helps maintain clarity and understanding of the codebase.
8. **Check the AGENTS_TODO.md file** for any additional tasks or components that need to be created. This file serves as a central place for tracking agent-created components and tasks.

## 3 Pitfalls to Avoid

1. Fusions OnEvent, OnChange follow the format: (keep in mind not all events or properties will be used in every component - A framebased component may not use OnEvent("Activated") but a GUIButton based component will, for example):

```ts
    MyComponent({
    ...otherProps,
    [OnEvent("EventName")]: (eventData) => {
        // Handle event
    },
    [OnChange("PropertyName")]: (newValue) => {
        // Handle property change
    },
})
```

## 4 Code Header Style

*Prepend the full TSDoc header template (see Appendix A) whenever you create a new `.ts` file.*

```ts
/// <reference types="@rbxts/types" />

/**
 * @file        HealthBarAtom.ts
 * @module      HealthBarAtom
 * @layer       Atom
 * @description Fusion atom that renders a segmented health bar for characters.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-05-29 by Luminesa – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 *
 * @remarks
 *   Uses them  from shared/quarks.ts.
 */

import Fusion from "@rbxts/fusion";
// …component code…
```
