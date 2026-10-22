import { Router } from "express";
import multer from "multer";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new Error("Only image files are allowed"));
    }
  }
});

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", upload.single("image"), createUser);

router.put("/:id", upload.single("image"), updateUser);

router.delete("/:id", deleteUser);

export default router;