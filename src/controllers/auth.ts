import { Request, Response } from "express";
import * as authService from "../services/auth";
import { composeError } from "../utils";

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await authService.signup(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: composeError(error) });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: composeError(error) });
  }
}
