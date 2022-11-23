import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../../../shared/middlewares/isAuthentiated";

//import isAuthenticated from "@shared/http/middlewares/isAuthentiated";

const usersRoutter = Router();
const userController = new UserController();

//customersRoutter.use(isAuthenticated);
usersRoutter.get("/", isAuthenticated, userController.list);

usersRoutter.get(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().messages({
        "any.required": `ID é requerido`,
      }),
    },
  }),
  userController.show
);

usersRoutter.post(
  "/",

  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required().messages({
        "any.required": `"nome" é requerido`,
      }),
      email: Joi.string().required().messages({
        "any.required": `"email" é requerido`,
      }),
      password: Joi.string().required().messages({
        "any.required": `"password" é requerido`,
      }),
    },
  }),
  userController.create
);

usersRoutter.delete(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().messages({
        "any.required": `ID é requerido`,
      }),
    },
  }),
  userController.delete
);

usersRoutter.put(
  "/:id",
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  userController.update
);

export default usersRoutter;
