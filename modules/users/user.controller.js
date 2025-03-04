import User from "./user.model.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res
      .status(200)
      .json({ status: "success", result: users.length, data: { users } });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    const user = await User.findById(UserId);
    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, address, role } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
    });
    await user.save();
    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, password, phoneNumber, address, role } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", error: "User id not found" });
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (password) {
      user.password = password;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (address) {
      user.address = address;
    }
    if (role) {
      user.role = role;
    }
    user.save();
    res.status(200).json({
      status: "success",
      message: "User updated successfully!",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ status: "success", message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

export const getWaiters = async (req, res) => {
  try {
    const waiters = await User.find({ role: "waiter" });

    if (!waiters) {
      return res
        .status(404)
        .json({ status: "fail", message: "There are no waiters found!" });
    }
    res
      .status(200)
      .json({ status: "success", result: waiters.length, data: { waiters } });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};
export const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "user" });

    if (!clients) {
      return res
        .status(404)
        .json({ status: "fail", message: "There are no users found!" });
    }
    res
      .status(200)
      .json({ status: "success", result: clients.length, data: { clients } });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};
