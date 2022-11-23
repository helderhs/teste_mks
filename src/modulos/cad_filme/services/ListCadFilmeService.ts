import { CadFilme } from "../typeorm/entities/CadFilme";
import CadFilmeRepository from "../typeorm/repositories/CadFilmeRepository";

class ListCadFilmeService {
  public async execute(): Promise<CadFilme[]> {
    //public async execute(data: IRequest) {
    const cadFilmeRepository = new CadFilmeRepository();
    const filmes = await cadFilmeRepository.Repository.find();
    return filmes;
  }
}

export default ListCadFilmeService;
