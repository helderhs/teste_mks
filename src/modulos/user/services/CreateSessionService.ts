import { Request, Response } from "express";
import AppError from "../../../shared/errors/AppError";
import { sign } from "jsonwebtoken";
import { User } from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";
import authConfig from "../../../config/auth";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

class SessionCreateService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse | Response> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha invalida.", 401);
      //return res.status(500).json({ message: "Email não encontrado." });
    }

    const passwordConfirmed = await compare(password, user.password_hash);
    if (!passwordConfirmed) {
      throw new AppError("Password incorreto.", 401);
    }

    const { id, nome } = user;
    const token = sign({ id }, authConfig.secret, {
      subject: user.id.toString(),
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }
}

export default SessionCreateService;
