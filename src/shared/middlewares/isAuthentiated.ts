import AppError from "../errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../config/auth";

interface ITokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
  id: number;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.secret);

    const { sub } = decodedToken as ITokenPayLoad;

    request.id_usuario = Number(sub);
    console.log(request.id_usuario);

    return next();
  } catch {
    throw new AppError("Token JWT invalido");
  }
}
