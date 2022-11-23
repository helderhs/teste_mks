import { Router } from "express";
import usersRoutes from "../modulos/user/routes/users.routes";
import cad_filmeRoutter from "../modulos/cad_filme/routes/cad_filme.routes";
import sessionsRoutes from "../modulos/user/routes/session.routes";
import { errors } from "celebrate";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello Dev!" });
});

routes.use("/user", usersRoutes);
routes.use("/filme", cad_filmeRoutter);
routes.use("/login", sessionsRoutes);

routes.use(errors());

export default routes;
