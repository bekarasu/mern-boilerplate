import { IFieldItem } from '../Form/IFieldItem';

export interface IFormProperties {
  items: Array<IFieldItem>;
  urlFromField?: string;
}
