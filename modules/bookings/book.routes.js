import express from "express";
import {
  getAllBookings,
  getOneBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from "./book.controller";

const router = express.Router();

router.route("/").get(getAllBookings).post(createBooking);
router
  .route("/:id")
  .get(getOneBooking)
  .put(updateBooking)
  .delete(deleteBooking);
