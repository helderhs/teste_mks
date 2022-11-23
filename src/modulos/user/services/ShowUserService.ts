import AppError from "../../../shared/errors/AppError";
import { User } from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    //public async execute(data: IRequest) {

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(Number(id));
    if (!user) {
      throw new AppError("Usuario não encontrado.");
    }
    return user;
  }
}

export default ShowUserService;
