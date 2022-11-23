import { User } from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class ListUserService {
  public async execute(): Promise<User[]> {
    //public async execute(data: IRequest) {
    const usersRepository = new UsersRepository();
    const users = await usersRepository.Repository.find();
    return users;
  }
}

export default ListUserService;
