import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { User } from "../entities/User";

//export const usersRepository = AppDataSource.getRepository(User);

class UsersRepository {
  Repository = AppDataSource.getRepository(User);

  public async findById(id: number): Promise<User | undefined | null> {
    const user = await this.Repository.findOne({
      where: { id },
      relations: ["filmes"],
      select: {
        id: true,
        nome: true,
        filmes: {
          id: true,
          nome: true,
        },
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined | null> {
    const user = await this.Repository.findOne({
      where: { email },
    });

    return user;
  }
}

export default UsersRepository;
