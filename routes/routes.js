import express from "express";
import userRoutes from "../modules/users/user.routes.js";
import orderRoutes from "../modules/order/order.routes.js";
import menuRoutes from "../modules/menu/menu.routes.js";
import bookingRoutes from "../modules/bookings/book.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/menus", menuRoutes);
router.use("/bookings", bookingRoutes);

export default router;
