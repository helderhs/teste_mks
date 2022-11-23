import AppError from "../../../shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
}
class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(Number(id));

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    await usersRepository.Repository.remove(user);
  }
}

export default DeleteCustomerService;
