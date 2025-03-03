import express from "express";
import {
  getAllMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu
} from "./menu.controller.js";

const router = express.Router();

router.route("/").get(getAllMenus);
router.route("/").post(createMenu);
router.route("/:id").get(getMenu);
router.route("/:id").put(updateMenu);
router.route("/:id").delete(deleteMenu);

export default router;
