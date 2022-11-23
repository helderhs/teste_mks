import AppError from "../../../shared/errors/AppError";
import CadFilmeRepository from "../typeorm/repositories/CadFilmeRepository";

interface IRequest {
  id: String;
}
class DeleteCadFilmeService {
  public async execute({ id }: IRequest): Promise<void> {
    const cadFilmeRepository = new CadFilmeRepository();
    const filme = await cadFilmeRepository.findById(Number(id));

    if (!filme) {
      throw new AppError("Filme não encontrado");
    }

    await cadFilmeRepository.Repository.remove(filme);
  }
}

export default DeleteCadFilmeService;
