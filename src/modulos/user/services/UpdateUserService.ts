import AppError from "../../../shared/errors/AppError";
import { User } from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";

interface IRequest {
  id: number;
  nome: string;
  email: string;
  password?: string;
  old_password?: string;
}
class UpdateUserService {
  public async execute({
    id,
    nome,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    //public async execute(data: IRequest) {
    const usersRepository = new UsersRepository();
    const userUpdate = await usersRepository.findById(id);

    if (!userUpdate) {
      throw new AppError("Usuario não encontrada.");
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    //console.log("Aee " + userUpdateEmail?.id + "-" + user_id);
    if (userUpdateEmail && userUpdateEmail.id.toString() !== id.toString()) {
      throw new AppError("Esse email ja existe.");
    }

    if (password && !old_password) {
      throw new AppError("Senha antiga é requerida.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(
        old_password,
        userUpdate.password_hash
      );

      if (!checkOldPassword) {
        throw new AppError("Senha antiga não valida.");
      }

      userUpdate.password_hash = await hash(password, 8);
    }

    userUpdate.nome = nome;
    userUpdate.email = email;

    await usersRepository.Repository.save(userUpdate);

    return userUpdate;
  }
}

export default UpdateUserService;
