import { Response } from "express";
import { User } from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
  nome: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    nome,
    email,
    password,
  }: IRequest): Promise<User | Response> {
    const userRepository = new UserRepository();

    const emailExists = await userRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError("Email já existe.", 401);
    }

    const password_hash = await hash(password, 8);

    const newUser = userRepository.Repository.create({
      nome,
      email,
      password_hash,
    });

    await userRepository.Repository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
