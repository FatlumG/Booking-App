import express from "express";
import {
  getAllBookings,
  getOneBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from "./book.controller.js";

const router = express.Router();

router.route("/").get(getAllBookings).post(createBooking);
router
  .route("/:id")
  .get(getOneBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

export default router;
