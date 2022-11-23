import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionService();
    const user = await createSessionService.execute({
      email,
      password,
    });
    return res.status(201).json(user);
  }
}
