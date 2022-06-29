import { FilterField } from '../../../client/admin/form';

export interface IGridProperties {
  fields: Array<string>;
  actions: IListActions;
  disableAdd?: boolean; // disables the Add button in list
  filterItems?: Array<FilterField>;
}
