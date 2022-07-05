import PlaygroundService from '../../../../services/Admin/PlaygroundService';
import { IFormProperties } from '../../../../types/admin/PageProperties/IFormProperties';
import { IGridProperties } from '../../../../types/admin/PageProperties/IGridProperties';
import { IShowProperties } from '../../../../types/admin/PageProperties/IShowProperties';
import ResourceController from './ResourceController';

class PlaygroundController extends ResourceController {
  protected serviceURL = 'playground';
  protected service = new PlaygroundService();
  protected title = 'Playground';

  grid = (): IGridProperties => ({
    fields: ['title', 'count', 'status'],
    actions: ['edit', 'show', 'delete'],
    filterItems: [
      {
        label: 'Title',
        type: 'text',
        name: 'title',
      },
      {
        label: 'Count',
        type: 'number',
        name: 'count',
      },
      {
        label: 'Status',
        type: 'switch',
        name: 'status',
      },
    ],
    disableAdd: false,
  });

  form = (): IFormProperties => ({
    items: [
      {
        name: 'title',
        type: 'text',
      },
      {
        name: 'status',
        type: 'switch',
      },
      {
        name: 'count',
        type: 'number',
      },
    ],
    urlFromField: 'title',
  });

  show = (): IShowProperties => {
    throw new Error('Method not implemented.');
  };
}

export default new PlaygroundController();
