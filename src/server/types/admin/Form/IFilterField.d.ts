import { IFieldItem } from './IFieldItem';

interface IFilterField extends IFieldItem {
  label: string; //
  type: 'number' | 'text' | 'switch' | 'select'; // component type
  name: string; // filter input name
}
