export interface IFieldItem {
  type: 'number' | 'text' | 'switch' | 'image' | 'wysiwyg' | 'select' | 'object';
  name: string;
  label?: string;
  options?: Array<{ value: string | number; text: string }>;
  required?: boolean;
  initialValue?: string | number | boolean;
  disabled?: boolean;
}
