import { IAdminMenu } from '../../types/models/AdminMenu';
import MongoRepository from './MongoRepository';

export default class AdminMenuRepository extends MongoRepository<IAdminMenu> {}
