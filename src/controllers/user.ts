import { Request, Response } from "express";
import * as userService from "../services/user";
import { composeError } from "../utils";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: composeError(error) });
  }
}

export async function getUserById(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: composeError(error) });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  try {
    await userService.deleteUserById(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: composeError(error) });
  }
}
