import { Button } from "./button.dto";
import { Func } from "./function.dto";

export enum ColumnType {
    Standard = 'standard',
    Date = 'date',
    Icon = 'icon',
    Control = 'control',
    Collapsible = 'collapsible',
}

export interface ColumnDefinition {
    type: ColumnType;
    label: string;
    key?: string;
    fn?: Func<any, string | string[]>;
    icon?: string | string[] | Func<any, string | string[]>;
    controls?: Button[];
}

export function getValue(val: any, def: ColumnDefinition) {
    if (def.fn) {
        return def.fn(val);
    } else {
        return val;
    }
}

export function getIcon(val: any, def: ColumnDefinition) {
    if (def.icon && def.icon instanceof Function) {
        return def.icon(val);
    } else if (def.icon instanceof String) {
        return def.icon;
    } else {
        throw new Error("invalid icon type");
    }
}

export interface TableDefinition {
    columns: ColumnDefinition[];
}