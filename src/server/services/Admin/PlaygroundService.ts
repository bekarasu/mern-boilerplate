import { Playground } from './../../models/Playground';
import PlaygroundRepository from '../../database/repositories/PlaygroundRepository';
import { IPlayground } from '../../types/models/Playground';
import BaseService from './BaseService';

export default class PlaygroundService extends BaseService<IPlayground> {
  protected repository = new PlaygroundRepository(Playground);
}
