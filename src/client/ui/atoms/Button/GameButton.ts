/// <reference types="@rbxts/types" />

/**
 * @file        GameButton.ts
 * @module      GameButton
 * @layer       Client/UI/Atoms
 * @description Panel-style button wrapper around `UIButton`.
 */

import { UIButton, UIButtonProps } from "./UIButton";

export interface GameButtonProps extends Partial<UIButtonProps> {
    Image?: string; // backward compatibility
}

export const GameButton = (p: GameButtonProps) => {
    const icon = p.Icon ?? p.Image;
    const props: Partial<UIButtonProps> = { ...p };
    delete (props as Partial<GameButtonProps>).Image;
    delete props.Icon;
    return UIButton({ Icon: icon, Variant: "panel", ...props });
};

