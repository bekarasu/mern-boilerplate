import { IPlayground } from '../../types/models/Playground';
import MongoRepository from './MongoRepository';

export default class PlaygroundRepository extends MongoRepository<IPlayground> {}
