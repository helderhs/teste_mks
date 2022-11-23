import AppError from "../../../shared/errors/AppError";
import { CadFilme } from "../typeorm/entities/CadFilme";
import CadFilmeRepository from "../typeorm/repositories/CadFilmeRepository";

interface IRequest {
  id: String;
}

class ShowCadFilmeService {
  public async execute({ id }: IRequest): Promise<CadFilme> {
    //public async execute(data: IRequest) {

    const cadFilmeRepository = new CadFilmeRepository();
    const filme = await cadFilmeRepository.findById(Number(id));
    if (!filme) {
      throw new AppError("Filme não encontrado.");
    }

    return filme;
  }
}

export default ShowCadFilmeService;
