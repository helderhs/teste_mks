import { Router } from "express";
import { CadFilmeController } from "../controllers/CadFilmeController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../../../shared/middlewares/isAuthentiated";
const cad_filmeRoutter = Router();
const cadFilmeController = new CadFilmeController();

//customersRoutter.use(isAuthenticated);
cad_filmeRoutter.get("/", isAuthenticated, cadFilmeController.list);

cad_filmeRoutter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().messages({
        "any.required": `ID é requerido`,
      }),
    },
  }),
  cadFilmeController.show
);

cad_filmeRoutter.post(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required().messages({
        "any.required": `"nome" é requerido`,
      }),
      descricao: Joi.string().required().messages({
        "any.required": `"descricao" é requerido`,
      }),
    },
  }),
  cadFilmeController.create
);

cad_filmeRoutter.put(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required().messages({
        "any.required": `"nome" é requerido`,
      }),
      descricao: Joi.string().required().messages({
        "any.required": `"descricao" é requerido`,
      }),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required().messages({
        "any.required": `ID é requerido`,
      }),
    },
  }),
  cadFilmeController.update
);

cad_filmeRoutter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().messages({
        "any.required": `ID é requerido`,
      }),
    },
  }),
  cadFilmeController.delete
);

export default cad_filmeRoutter;
