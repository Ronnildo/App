import { Router } from "express"; //importr apenas o Routers do express
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import AuthMiddlewares from "./app/middlewares/auth";
import FileController from "./app/controllers/FileController";
import PrestadorServicoController from "./app/controllers/PrestadorServicoController";
import AgendamentoController from './app/controllers/AgendamentoController';
import AgendaController from './app/controllers/AgendaContoller';
import NotificacaoCntroller from './app/controllers/NotificacaoController';

const routes = new Router();

const upload = multer(multerConfig);

routes.get("/", (req, res) => {
  return res.json({ mensagem: "helo world" });
});

routes.post("/user", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(AuthMiddlewares);
routes.put("/user", UserController.update);

routes.post("/file", upload.single("file"), FileController.store);

routes.get("/prestadorServico", PrestadorServicoController.index);
routes.post('/agendamento', AgendamentoController.store);

routes.get("/agendamento", AgendamentoController.index);

routes.get("/agendaservico", AgendaController.index);
routes.get('/notificacoes', NotificacaoCntroller.index);

routes.put('/notificacoes/:id', NotificacaoCntroller.update);


export default routes;
