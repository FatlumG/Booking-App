import express from "express";
import menuRoutes from "../modules/menu/menu.routes.js";
const router = express.Router();

router.use("/menu", menuRoutes);
