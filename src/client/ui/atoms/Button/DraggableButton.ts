/// <reference types="@rbxts/types" />

/**
 * @file        DraggableButton.ts
 * @module      DraggableButton
 * @layer       Client/UI/Atoms
 * @description Thin wrapper around `UIButton` with drag enabled.
 */

import { UIButton, UIButtonProps } from "./UIButton";

export interface DraggableButtonProps extends Partial<UIButtonProps> {
    Image?: string;
}

export const DraggableButton = (p: DraggableButtonProps) => {
    const icon = p.Icon ?? p.Image;
    const props: Partial<UIButtonProps> = { ...p };
    delete (props as Partial<DraggableButtonProps>).Image;
    delete props.Icon;
    return UIButton({ Draggable: true, Variant: "flat", Icon: icon, ...props });
};

