import { Router } from "express"; //importr apenas o Routers do express
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from "./app/controllers/SessionController";
import AuthMiddlewares from './app/middlewares/auth';
import FileController from './app/controllers/FileController';


const routes = new Router();

const upload = multer();

routes.get("/", (req, res) => {
  return res.json({ mensagem: "helo world" });
});

routes.post('/user', UserController.store);
routes.post('/file', upload.single('avatar') , FileController.store);

routes.post("/sessions", SessionController.store);

routes.use(AuthMiddlewares);
routes.put('/user', UserController.update);


export default routes;