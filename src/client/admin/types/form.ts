import { FormEvent } from 'react';
import { Message } from './redux';

export interface FieldItem {
  type: 'number' | 'text' | 'switch' | 'image' | 'wysiwyg' | 'select' | 'hidden';
  name: string;
  label?: string;
  options?: Array<{ value: string | number; text: string }>;
  required?: boolean;
  initialValue?: string | null | number | boolean;
}

export interface IFieldItemState {
  value: string | null | number | boolean;
}

export interface FilterField extends FieldItem {
  label: string;
  type: 'number' | 'text' | 'switch' | 'select';
  name: string;
}

export interface IFilter {
  name: string;
  value: string;
}

export interface ICustomFormProps {
  items: Array<FieldItem>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  footerComponent?: unknown;
  urlFromField?: string;
}

export type ListAction = 'edit' | 'delete' | 'show';

export interface IListActions {
  [key: number]: ListAction;
}

export interface IActionMenuState {
  opened: Element | ((element: Element) => Element) | null;
  dialogOpened: boolean;
}
export interface IActionMenuProps {
  url: string;
  actions: IListActions;
  actionResult: (result: boolean) => void;
}

export interface IResultMessageBoxProps {
  result: Message | null;
}

export interface IFormPostRequestFields {
  [key: string]: string;
}

export interface IResourceGetRequestParams {
  limit?: number;
  start?: number;
  orderBy?: string;
  search?: string;
}

export interface IReduxFormProps {
  input?: { onChange: (value: string | number | boolean | FileList) => void };
}
