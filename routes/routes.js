import express from "express";
import userRoutes from "../modules/order/order.routes.js";
import orderRoutes from "../modules/order/order.routes.js";
import menuRoutes from "../modules/menu/menu.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/menus", menuRoutes);

export default router;
