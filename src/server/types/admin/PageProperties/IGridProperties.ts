export interface IGridProperties {
  fields: Array<string>;
  actions: IListActions;
  disableAdd?: boolean; // disables the Add button in list
  filterItems?: Array<FilterField>;
}

interface FilterField extends FieldItem {
  label: string;
  type: 'number' | 'text' | 'switch' | 'select';
  name: string;
}

interface FieldItem {
  label?: string;
  type: 'number' | 'text' | 'switch' | 'image' | 'wysiwyg' | 'select';
  name: string;
  options?: Array<{ value: string | number; text: string }>;
  required?: boolean;
  initialValue?: string | null | number | boolean;
}
