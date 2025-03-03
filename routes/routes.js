import express from "express";
import userRoutes from "../modules/order/order.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import menuRoutes from "../modules/menu/menu.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/menu", menuRoutes);

export default router;
