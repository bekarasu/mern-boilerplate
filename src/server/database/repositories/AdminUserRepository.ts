import { IAdminUser } from '../../types/models/AdminUser';
import MongoRepository from './MongoRepository';

export default class AdminUserRepository extends MongoRepository<IAdminUser> {}
