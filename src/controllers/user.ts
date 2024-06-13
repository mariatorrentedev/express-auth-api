import type { Request, Response } from "express";
import * as userService from "../services/user";
import bcrypt from "bcryptjs";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  try {
    await userService.deleteUserById(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function editUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const { email, password, ...otherProps } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const updatedUser = await userService.editUser(userId, {
      email,
      password: hashedPassword,
      ...otherProps,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error });
  }
}
