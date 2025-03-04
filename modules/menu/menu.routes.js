import express from "express";
import {
  getAllMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from "./menu.controller.js";

const router = express.Router();

router.route("/").get(getAllMenus).post(createMenu);
router.route("/:id").get(getMenu).put(updateMenu).delete(deleteMenu);

export default router;
