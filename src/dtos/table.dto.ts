import { HashMap } from "@/services/base.service";
import { RawLocation } from "vue-router";
import { Button } from "./button.dto";
import { Func } from "./function.dto";

export enum ColumnType {
    Standard = 'standard',
    RouterLink = 'router-link',
    Link = 'link',
    Date = 'date',
    Icon = 'icon',
    Control = 'control',
    Collapsible = 'collapsible',
}

export interface RowValue {
    key: string;
    fn?: Func<any, any>,
}

export function evaluate(row: HashMap<any>, value: RowValue) {
    if (value.fn) {
        return value.fn(row[value.key]);
    } else {
        return row[value.key];
    }
}

export interface StandardColDef {
    type: ColumnType.Standard | ColumnType.Date | ColumnType.Icon | ColumnType.Collapsible;
    label: string;
    value: RowValue;
}

export interface LinkColDef {
    type: ColumnType.RouterLink | ColumnType.Link;
    to: RowValue;
    label: string;
    linkLabel: RowValue;
}

export interface ControlColDef {
    type: ColumnType.Control;
    label: string;
    controls: Button[];
}

export type ColumnDefinition = StandardColDef |
    LinkColDef |
    ControlColDef;

export interface TableDefinition {
    columns: ColumnDefinition[];
}