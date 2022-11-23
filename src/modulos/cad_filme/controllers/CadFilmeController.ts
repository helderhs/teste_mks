import { Request, Response } from "express";
import CreateCadFilmeService from "../services/CreateCadFilmeService";
import ListCadFilmeService from "../services/ListCadFilmeService";
import ShowCadFilmeService from "../services/ShowCadFilmeService";
import DeleteCadFilmeService from "../services/DeleteCadFilmeService";
import UpdateCadFilmeService from "../services/UpdateCadFilmeService";
import { Cache } from "../../../shared/cache/cache";

export class CadFilmeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, descricao } = req.body;
    const id_usuario = req.id_usuario;
    //console.log(id_usuario);
    const createCadFilmeService = new CreateCadFilmeService();
    const filme = await createCadFilmeService.execute({
      nome,
      descricao,
      id_usuario,
    });

    return res.status(201).json(filme);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body;
    const { id } = request.params;
    id;
    const updateCadFilmeService = new UpdateCadFilmeService();
    const filme = await updateCadFilmeService.execute({
      id,
      nome,
      descricao,
    });

    return response.json(filme);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const _cache = new Cache();
    const cached = await _cache.get(id.toString());
    if (cached) {
      console.log("redis usado");
      return response.json(cached);
    }

    const showCadFilmeService = new ShowCadFilmeService();

    const filme = await showCadFilmeService.execute({ id });
    await _cache.set(filme.id.toString(), filme, 60);

    return response.json(filme);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const listCadFilmeService = new ListCadFilmeService();
    const filmes = await listCadFilmeService.execute();
    return res.status(201).json(filmes);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCadFilmeService = new DeleteCadFilmeService();

    await deleteCadFilmeService.execute({ id });

    return response.json([]);
  }
}
