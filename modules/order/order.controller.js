import Order from "./order.model.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  try {
    console.log(req.body);

    const { clientId, bookingId, orderItems } = req.body;

    if (!clientId || !orderItems) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const order = new Order({
      clientId,
      bookingId,
      orderItems,
      status: "pending",
    });

    const createdOrder = await order.save();
    res.status(201).json({
      status: "success",
      message: "Order created successfully!",
      data: { createdOrder },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({})
//       .populate("clientId", "name email")
//       .populate("orderItems.productId", "name price");

//     const orderTotalPrice = await Order.aggregate([
//       {
//         $match: { clientId: new mongoose.Types.ObjectId(clientId) },
//       },
//       {
//         $unwind: "$orderItems",
//       },
//       {
//         $lookup: {
//           from: "menus",
//           localField: "$orderItems.productId",
//           foreignField: "_id",
//           as: "productDetails",
//         },
//       },
//       {
//         $unwind: "$productDetails",
//       },
//       {
//         $group: {
//           _id: "$_id",
//           totalPrice: { $sum: "$productDetails.price" },
//           orderItems: { $push: "$orderItems" },
//           clientId: { $first: "$clientId" },
//           status: { $first: "$status" },
//         },
//       },
//     ]);
//     res.status(200).json({ status: "success", data: { orders } });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "clientId",
          foreignField: "_id",
          as: "clientDetails",
        },
      },
      { $unwind: "$clientDetails" },
      {
        $lookup: {
          from: "menus",
          localField: "orderItems.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$orderItems" },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$_id",
          clientId: { $first: "$clientId" },
          firstName: { $first: "$clientDetails.firstName" },
          lastName: { $first: "$clientDetails.lastName" },
          orderItems: { $push: "$orderItems" },
          totalPrice: { $sum: "$productDetails.price" },
          status: { $first: "$status" },
        },
      },
    ]);

    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("clientId", "name email")
      .populate("orderItems.productId", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ status: "success", data: { order } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Order status updated successfully!",
      data: { order },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
