import { Func } from "./function.dto";

export type ButtonType = "primary" | "secondary" | "danger" | "warning" | "dark" | "light" | "info" | "link";

export interface Button {
    icon?: string | string[];
    label?: string;
    type: ButtonType;
    onClick: (e: MouseEvent) => void;
    disabled?: boolean;
    disabledFn?: Func<any, boolean>
}

export function isDisabled(val: any, button: Button) {
    console.log(button);
    console.log(val);
    if (button.disabledFn) {
        return button.disabledFn(val);
    } else if (button.disabled) {
        return button.disabled;
    }
    return false;
}