import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getWaiters,
  getClients,
} from "./user.controller.js";

const router = express.Router();

router.get("/waiters", getWaiters);
router.get("/clients", getClients);
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
