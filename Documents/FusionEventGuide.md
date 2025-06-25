# Fusion Event Guide

This guide provides a quick reference for using the `OnEvent()` function in Fusion, a powerful UI framework for Roblox. `OnEvent()` allows you to bind to various events on Roblox UI elements, enabling you to respond to user interactions like clicks, drags, and input changes.
Below is a quick-reference of the events you can pass to `OnEvent("…")` in Fusion.
*“Common (Instance)”* lists signals every Roblox `Instance` exposes, while *“Common (GuiObject)”* covers the interactive signals inherited by **all** `GuiObject`-based UI elements. Then you’ll find the extra events added by specific UI classes.

| **Class / Heading**                                        | **Event names you can use with `OnEvent()`**                                                                                                                                                                                                                                 | Notes                                                                                   |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Common (Instance)**                                      | `AncestryChanged`, `AttributeChanged`, `ChildAdded`, `ChildRemoved`, `DescendantAdded`, `DescendantRemoving`, `Destroying`, `StyledPropertiesChanged`                                                                                                                        | Available on every Instance in the hierarchy ([create.roblox.com][1])                   |
| **Common (GuiObject + GuiBase2d)**                         | `InputBegan`, `InputChanged`, `InputEnded`, `MouseEnter`, `MouseLeave`, `MouseMoved`, `MouseWheelBackward`, `MouseWheelForward`, `SelectionGained`, `SelectionLost`, `TouchLongPress`, `TouchPan`, `TouchPinch`, `TouchRotate`, `TouchSwipe`, `TouchTap`, `SelectionChanged` | Present on every on-screen UI element (Frame, TextLabel, etc.) ([create.roblox.com][2]) |
| **GuiButton** (base for `TextButton`, `ImageButton`, etc.) | `Activated`, `MouseButton1Click`, `MouseButton1Down`, `MouseButton1Up`, `MouseButton2Click`, `MouseButton2Down`, `MouseButton2Up`                                                                                                                                            | Adds click-specific signals on top of the GuiObject set ([create.roblox.com][3])        |
| **ImageButton / TextButton**                               | *Inherits everything from GuiButton*                                                                                                                                                                                                                                         | No extra events beyond GuiButton ([create.roblox.com][4])                               |
| **TextBox**                                                | `Focused`, `FocusLost`, `ReturnPressedFromOnScreenKeyboard`                                                                                                                                                                                                                  | Fire only on the **client**; ideal for text-input handling ([create.roblox.com][5])     |
| **UIDragDetector**                                         | `DragStart`, `DragContinue`, `DragEnd`                                                                                                                                                                                                                                       | Fires as users begin, move, and finish a drag gesture ([create.roblox.com][6])          |

### How to read & extend this table

* **If a class isn’t listed**, combine the appropriate *Common* set with any extras the class adds—check its API page on the Creator Hub.
* **Fusion usage:**

  ```ts
  New("ImageButton")({
      Image = "rbxassetid://…",
      [OnEvent("Activated")] = () => print("Clicked!"),
      [OnEvent("MouseEnter")] = () => hover.set(true),
  })
  ```

* **Property-change events:** You can also bind to `"Changed"` or `GetPropertyChangedSignal("PropertyName")` the same way; they’re not shown above because they’re property-specific rather than UI-interaction events.

[1]: https://create.roblox.com/docs/reference/engine/classes/Instance "Instance | Documentation - Roblox Creator Hub"
[2]: https://create.roblox.com/docs/reference/engine/classes/GuiObject "GuiObject | Documentation - Roblox Creator Hub"
[3]: https://create.roblox.com/docs/reference/engine/classes/GuiButton "GuiButton | Documentation - Roblox Creator Hub"
[4]: https://create.roblox.com/docs/reference/engine/classes/ImageButton "ImageButton | Documentation - Roblox Creator Hub"
[5]: https://create.roblox.com/docs/reference/engine/classes/TextBox "TextBox | Documentation - Roblox Creator Hub"
[6]: https://create.roblox.com/docs/reference/engine/classes/UIDragDetector "UIDragDetector | Documentation - Roblox Creator Hub"
