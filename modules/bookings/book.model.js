import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "canceled", "completed", "not-show"],
      default: "pending",
    },
    bookingDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.Model("Book", bookSchema);

export default Book;
