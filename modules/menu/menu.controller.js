import Menu from "./menu.model.js";

export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ status: "success", result: menus.length, data: { menus } });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res
        .status(404)
        .json({ status: "fail", message: "Menu not found" });
    }
    res.status(200).json({ status: "success", data: { menu } });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const menu = new Menu({ name, description, price, category });
    await menu.save();
    res.status(201).json({
      status: "success",
      message: "Menu item created successfully!",
      data: { menu },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!menu) {
      return res
        .status(404)
        .json({ status: "fail", message: "Menu not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Menu item updated successfully!",
      data: { menu },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res
        .status(404)
        .json({ status: "fail", message: "Menu not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Menu item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};
