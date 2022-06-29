export interface IFieldItem {
  type: 'number' | 'text' | 'switch' | 'image' | 'wysiwyg' | 'select' | 'object'; // component type
  name: string; // form input name for requests
  label?: string; // form label
  options?: Array<{ value: string | number; text: string }>; // select options
  required?: boolean; // required input
  initialValue?: any; // init input value
  disabled?: boolean; // init input value
}
