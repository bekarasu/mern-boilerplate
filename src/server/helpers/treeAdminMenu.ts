import { IAdminMenu } from '../types/models/AdminMenu';
import { trans } from '../../shared/resources/lang/translate';
import { IAdminMenu as SharedIAdminMenu } from '../../shared/types/AdminMenu';

export const treeAdminMenu = (list: Array<IAdminMenu>): Array<SharedIAdminMenu> => {
  const idMapping = list.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  const root: Array<IAdminMenu> = [];

  list.forEach((el: IAdminMenu) => {
    if (el.parentID === null || el.parentID === 0) {
      root.push(el);
      return;
    }
    const parentEl = list[idMapping[el.parentID]];

    parentEl.children = [...(parentEl.children || []), el];
  });

  list.forEach((el: IAdminMenu) => {
    if (typeof el.label !== 'string') {
      el.label = trans(el.label.key, el.label.params);
    }
    return el;
  });

  return root;
};
