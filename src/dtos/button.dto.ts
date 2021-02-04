import { HashMap } from "@/services/base.service";
import { Func } from "./function.dto";
import { RowValue } from "./table.dto";

export type ButtonType = "primary" | "secondary" | "danger" | "warning" | "dark" | "light" | "info" | "link";

export interface Button {
    icon?: string | string[];
    label?: string;
    type: ButtonType;
    onClick: (e: MouseEvent, payload: any) => void;
    disabled?: RowValue;
}
