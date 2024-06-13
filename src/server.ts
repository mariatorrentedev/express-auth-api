import type { Request, Response } from "express";
import express from "express";
import { PORT } from "./config";
import app from "./app";

app.use(express.json());

app.get("/api/*", (req: Request, res: Response) => {
  res.json({ ok: true });
});
/**
 * Add Host to be runnable in Railway.
 *
 * See @https://docs.railway.app/guides/fixing-common-errors
 */
app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
