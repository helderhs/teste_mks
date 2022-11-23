import AppError from "../../../shared/errors/AppError";
import { CadFilme } from "../typeorm/entities/CadFilme";
import CadFilmeRepository from "../typeorm/repositories/CadFilmeRepository";

interface IRequest {
  id: string;
  nome: string;
  descricao: string;
}
class UpdateCadFilmeService {
  public async execute({ id, nome, descricao }: IRequest): Promise<CadFilme> {
    //public async execute(data: IRequest) {
    const cadFilmeRepository = new CadFilmeRepository();
    const filmeUpdate = await cadFilmeRepository.findById(Number(id));

    if (!filmeUpdate) {
      throw new AppError("Filme não encontrada.");
    }

    filmeUpdate.nome = nome;
    filmeUpdate.descricao = descricao;

    await cadFilmeRepository.Repository.save(filmeUpdate);

    return filmeUpdate;
  }
}

export default UpdateCadFilmeService;
