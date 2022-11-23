import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import DeletaUserService from "../services/DeletaUserService";
import UpdateUserService from "../services/UpdateUserService";

export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, email, password } = req.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      nome,
      email,
      password,
    });

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    let _id = Number(id);
    const { nome, email, password, old_password } = req.body;

    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({
      id: _id,
      nome,
      email,
      password,
      old_password,
    });

    return res.status(201).json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = new ShowUserService();

    const tarefa = await showUserService.execute({ id });
    return response.json(tarefa);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();
    return res.status(201).json(users);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletaUserService = new DeletaUserService();

    await deletaUserService.execute({ id });

    return response.json([]);
  }
}
