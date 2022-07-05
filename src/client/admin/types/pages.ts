import { FieldItem, FilterField, IListActions } from './form';
import { Message } from './redux';
import { ITheme } from './theme';
import { IPanelUser } from './user';

export interface IReduxUserProps {
  user: IPanelUser;
}
export interface ILoginPageState {
  username: string;
  password: string;
}

export interface IAuthenticatedPageProps {
  result: Message | null;
  theme: ITheme;
}

export interface ICrudPageProps {
  serverResource: string;
}

export interface ICrudPageState {
  // TODO these will be must
  title?: string | null;
  resource?: string | null;
  fetching: boolean;
}

export interface ICreatePageState extends ICrudPageState {
  redirectURL: string | null; // TODO add this to app-wide system
  items: Array<FieldItem>;
  urlFromField?: string;
}

export interface IUpdatePageProps extends ICrudPageProps {
  items: Array<FieldItem>;
  id: string;
  resource: string;
}

export interface IUpdatePageState extends ICrudPageState {
  items: Array<FieldItem>;
  fetching: boolean;
}

export interface IListPageState extends ICrudPageState {
  fields: Array<string>;
  actions: IListActions;
  disableAdd?: boolean;
  filterItems?: Array<FilterField>;
}

export interface IResourceRouteProps {
  resource: string;
}
