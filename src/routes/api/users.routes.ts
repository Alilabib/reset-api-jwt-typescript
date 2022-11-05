import { Router,Request, Response } from "express";
import * as userController from '../../controllers/users.controller';
import auth  from '../../middleware/auth.middleware';
const routes = Router();

routes.route('/')
.get(auth,userController.getMany)
.post(userController.create);
routes.route('/:id')
.get(userController.getOne)
.put(userController.updateOne)
.delete(userController.deleteOne);

routes.route('/login').post(userController.login);
export default routes;