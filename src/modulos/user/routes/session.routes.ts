import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { celebrate, Joi, Segments } from "celebrate";

//import isAuthenticated from "@shared/http/middlewares/isAuthentiated";

const usersRoutter = Router();
const sessionController = new SessionController();

usersRoutter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().messages({
        "any.required": `"email" é requerido`,
      }),
      password: Joi.string().required().messages({
        "any.required": `"password" é requerido`,
      }),
    },
  }),
  sessionController.create
);

export default usersRoutter;
