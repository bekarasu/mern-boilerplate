import { FilterField, IListActions, IResourceGetRequestParams } from './form';
import { FieldItem } from './form.d';
import { IFilterFields } from './redux';

export interface IFilterProps {
  items: Array<FilterField>;
}

export interface IFilterState {
  // items: Array<any> // TODO data from server
  showFilter: boolean;
}

export interface IDataTableProps {
  resourceURL: string; // server fetching data, gets from server
  fields: Array<string>; // for showing data fields, gets from server
  actions: IListActions; // Action menu for each row, gets from server
  filterFields?: Array<FilterField>; // available filter fields, gets from server
  filters?: IFilterFields; // active filters for fetching data
}

export interface IDataTableState {
  items: Array<any>;
  fetching: boolean;
  requestParams: IResourceGetRequestParams;
  deleteResult: string | null;
  dataCount: number;
  currentPage: number;
}

export interface IDataTableComponentProps extends IDataTableProps {
  fetching?: boolean; // we pass the fetching state from IDataTableState to this props
}

export interface IDataTableHeadProps extends IDataTableComponentProps {
  items: Array<any>;
}

export interface IDataTableBodyProps extends IDataTableComponentProps {
  items: Array<any>;
  actionResult: (result: boolean) => void; // delete result in action menu "delete" button
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

interface IMenuItemProps {
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

interface IMultiLevelState {
  opened: boolean;
}
