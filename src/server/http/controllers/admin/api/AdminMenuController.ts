import { Request, Response } from 'express';
import AdminMenuRepository from '../../../../database/repositories/AdminMenuRepository';
import { treeAdminMenu } from '../../../../helpers/treeAdminMenu';
import '../../../../libraries/ApiResponse';
import { AdminMenu } from '../../../../models/AdminMenu';

class AdminMenuController {
  async getList(req: Request, res: Response) {
    const service = new AdminMenuRepository(AdminMenu);
    const adminMenuDocuments = await service.findAll();
    const sidebarItems = treeAdminMenu(adminMenuDocuments);
    res.setMessage('').customResponse(sidebarItems);
  }
}
export default new AdminMenuController();
