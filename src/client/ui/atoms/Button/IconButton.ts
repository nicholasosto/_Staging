/// <reference types="@rbxts/types" />

/**
 * @file        IconButton.ts
 * @module      IconButton
 * @layer       Client/UI/Atoms
 * @description Thin icon button wrapper around `UIButton`.
 */

import { UIButton, UIButtonProps } from "./UIButton";

export interface IconButtonProps extends Partial<UIButtonProps> {
    Icon: string;
    Image?: string;
}

export const IconButton = (p: IconButtonProps) => {
    const icon = p.Icon ?? p.Image;
    const props: Partial<UIButtonProps> = { ...p };
    delete (props as Partial<IconButtonProps>).Image;
    delete props.Icon;
    return UIButton({ Icon: icon, Variant: "flat", ...props });
};

