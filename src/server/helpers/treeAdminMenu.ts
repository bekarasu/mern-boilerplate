import { IAdminMenu } from '../../../@types/shared/AdminMenu';
import { trans } from '../../shared/resources/lang/translate';

// generate the menu tree
export function treeAdminMenu(list: Array<IAdminMenu>): Array<IAdminMenu> {
  const idMapping = list.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  const root: Array<IAdminMenu> = [];
  list.forEach((el: IAdminMenu) => {
    if (el.parentID === null || el.parentID === 0) {
      // it is root element
      root.push(el);
      return;
    }
    // Use our mapping to locate the parent element in our data array
    const parentEl = list[idMapping[el.parentID]];

    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el];
  });
  list.forEach((el: IAdminMenu) => {
    // translate the item text from label key
    if (typeof el.label !== 'string') {
      el.label = trans(el.label.key, el.label.params);
    }
    return el;
  });
  return root;
}
