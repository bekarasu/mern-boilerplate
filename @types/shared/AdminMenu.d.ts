import { TranslateParams } from './lang';

export interface IAdminMenu {
  id: string;
  name: string;
  label: IAdminMenuLabel | string;
  url?: string;
  parentID: number;
  children?: Array<IAdminMenu>;
}

export interface IAdminMenuLabel {
  key: string;
  params: TranslateParams;
}
