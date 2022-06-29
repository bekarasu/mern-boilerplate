import { IUser } from '../../shared/User';
import { ISidebarElementProps } from './components';
import { ITheme } from './theme';

export interface ISidebarProps {
  user: IUser;
}

export interface ISidebarState {
  listItems: Array<ISidebarElementProps>;
}

export interface INavbarProps {
  style: React.CSSProperties;
  theme: ITheme;
}
