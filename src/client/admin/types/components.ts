import { FilterField, IListActions, IResourceGetRequestParams } from './form';
import { FieldItem } from './form';
import { IFilterFields } from './redux';

export interface IFilterProps {
  items: Array<FilterField>;
}

export interface IFilterState {
  // items: Array<any> // TODO data from server
  showFilter: boolean;
}

export interface IDataTableProps {
  resourceURL: string;
  fields: Array<string>;
  actions: IListActions;
  filterFields?: Array<FilterField>;
  filters?: IFilterFields;
}

export interface IDataTableState {
  items: Array<{}>;
  fetching: boolean;
  requestParams: IResourceGetRequestParams;
  deleteResult: string | null;
  dataCount: number;
  currentPage: number;
}

export interface IDataTableComponentProps extends IDataTableProps {
  fetching?: boolean;
}

export interface IDataTableHeadProps extends IDataTableComponentProps {
  items: Array<{}>;
}

export interface IDataTableBodyProps extends IDataTableComponentProps {
  items: Array<{ [key: string]: object | boolean | string | number }>;
  actionResult: (result: boolean) => void;
}

export interface IDataTableFooterProps extends IDataTableComponentProps {
  dataCount: number;
  limit: number;
  currentPage: number;
  pageChange: (count: number) => void;
  dataLengthChange: (length: number) => void;
}

export interface IConfirmationDialogProps {
  opened: boolean;
  actionFunction: () => void;
  closeFunction: () => void;
}

export interface IFormFieldLoaderProps {
  item: FieldItem;
  style?: React.CSSProperties;
}

export interface IResourceRoute {
  link: string;
  serverResource?: string;
}

export interface ISliderButtonProps {
  buttonCount: number;
  buttonClickHandler: (page: number) => void;
  activeButton: number;
}
export interface ISliderButtonState {
  activeButton: number;
}

export interface IMenuItemProps {
  item: ISidebarElementProps;
}

export interface INestedListProps {
  items: Array<ISidebarElementProps>;
}

export interface ISidebarElementProps {
  name: string;
  label: string;
  url?: string;
  children?: Array<ISidebarElementProps>;
}

export interface IMultiLevelState {
  opened: boolean;
}
