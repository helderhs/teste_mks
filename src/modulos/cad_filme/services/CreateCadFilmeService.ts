import { CadFilme } from "../typeorm/entities/CadFilme";
import CadFilmeRepository from "../typeorm/repositories/CadFilmeRepository";

interface IRequest {
  nome: string;
  descricao: string;
  id_usuario: number;
}

class CreateCadFilmeService {
  public async execute({
    nome,
    descricao,
    id_usuario,
  }: IRequest): Promise<CadFilme> {
    const cadFilmeRepository = new CadFilmeRepository();

    const novoFilme = cadFilmeRepository.Repository.create({
      nome,
      descricao,
      id_usuario,
    });

    await cadFilmeRepository.Repository.save(novoFilme);

    return novoFilme;
  }
}

export default CreateCadFilmeService;
