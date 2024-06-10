import { Router } from "express";
import * as userController from "../controllers/user";
import { authenticateToken } from "../middleware/authToken";

const router = Router();

router.get("/", authenticateToken, userController.getUsers);
router.get("/:id", authenticateToken, userController.getUserById);
router.delete("/:id", authenticateToken, userController.deleteUserById);
router.put("/:id", authenticateToken, userController.editUser);

export default router;
