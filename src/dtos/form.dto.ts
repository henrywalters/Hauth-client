import { ButtonType } from "./button.dto";

export enum FormFieldType {
    Label = 'label',
    Text = 'text',
    Number = 'number',
    Email = 'email',
    Password = 'password',
    Telephone = 'tel',
    Textarea = 'textarea',
    Select = 'select',
    Checkbox = 'checkbox',
    ArraySelect = 'array-select',
    Blankspace = 'blankspace',
    Button = 'button',
}

export interface IIdentifiable {
    id: string | number;
}

export interface SelectOption {
    label: string;
    value: any;
}

export interface BaseFieldDefinition {
    key: string;
    label: string;
    columns?: number;
}

export interface StandardFieldDefinition extends BaseFieldDefinition {
    type: FormFieldType.Text | 
        FormFieldType.Email | 
        FormFieldType.Password | 
        FormFieldType.Telephone | 
        FormFieldType.Textarea | 
        FormFieldType.Checkbox
    ;
}

export interface LabelFieldDefinition {
    label: string;
}

export interface NumberFieldDefinition extends BaseFieldDefinition {
    type: FormFieldType.Number;
    min: number;
    max: number;
}

export interface SelectFieldDefinition extends BaseFieldDefinition {
    type: FormFieldType.Select
    options: SelectOption[];
}

export interface ArraySelectFieldDefinition extends BaseFieldDefinition {
    type: FormFieldType.ArraySelect
    labelKey: string;
    optionsFn: () => Promise<IIdentifiable[]>;
}

export interface BlankFieldDefinition {
    columns?: number;
}

export interface ButtonFieldDefinition {
    type: FormFieldType.Button,
    label: string;
    buttonType: string;
    columns?: number;
    onClick: (e: MouseEvent) => void;
}

export type FormFieldDefinition = StandardFieldDefinition | 
    NumberFieldDefinition | 
    SelectFieldDefinition | 
    ArraySelectFieldDefinition |
    ButtonFieldDefinition |
    LabelFieldDefinition
;

export interface FormDefinition {
    fields: FormFieldDefinition[];
    label: string;
    hint?: string;
}

export function isSelectOption(obj: any): obj is SelectOption {
    return "label" in obj && "value" in obj;
}