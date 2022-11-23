import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { CadFilme } from "../entities/CadFilme";

//export const usersRepository = AppDataSource.getRepository(User);

class CadFilmeRepository {
  Repository = AppDataSource.getRepository(CadFilme);

  public async findById(id: Number): Promise<CadFilme | undefined | null> {
    const filme = await this.Repository.findOne({
      where: { id: Number(id) },
    });
    return filme;
  }
}

export default CadFilmeRepository;
