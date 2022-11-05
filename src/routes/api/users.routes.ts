import { Router,Request, Response } from "express";
import * as userController from '../../controllers/users.controller';
const routes = Router();

routes.route('/')
.get(userController.getMany)
.post(userController.create);
routes.route('/:id')
.get(userController.getOne)
.put(userController.updateOne)
.delete(userController.deleteOne);

routes.route('/login').post(userController.login);
export default routes;