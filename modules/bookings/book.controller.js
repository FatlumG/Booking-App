import Book from "./book.model.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Book.find()
      .populate("clientId", "name email")
      .populate("menuId", "name price");
    res.status(200).json({ status: "success", data: bookings });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

export const getOneBooking = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId)
      .populate("clientId", "name email")
      .populate("menuId", "name price");

    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    res.status(404).json({ status: "fail", error: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { clientId, menuId, bookingStatus, bookingDate, bookingHour } =
      req.body;

    const newBook = new Book({
      clientId,
      menuId,
      bookingStatus,
      bookingDate,
      bookingHour,
    });

    await newBook.save();
    res.status(201).json({ status: "success", data: newBook });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { clientId, menuId, bookingStatus, bookingDate } = req.body;

    const book = await Book.findById(bookId);

    if (!book)
      return res
        .status(404)
        .json({ status: "fail", error: "User id not found" });

    if (clientId) {
      book.clientId = clientId;
    }
    if (menuId) {
      book.menuId = menuId;
    }
    if (bookingStatus) {
      book.bookingStatus = bookingStatus;
    }
    if (bookingDate) {
      book.bookingDate = bookingDate;
    }

    await book.save();
    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res
      .status(200)
      .json({ status: "success", message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};
