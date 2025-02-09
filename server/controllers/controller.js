import { Province } from "../models/models.js";

const addProvince = async (req, res) => {
  try {
    const { name, totalBudget, spentBudget, locals } = req.body;
    const province = new Province({ name, totalBudget, spentBudget, locals });
    await province.save();
    res.status(201).json(province);
  } catch (error) {
    console.error("Error adding province:", error); // Log the error
    console.error("Mongoose validation errors:", error.errors); // Log Mongoose validation errors
    res.status(400).json({ error: error.message });
  }
};

const getAllProvince = async (req, res) => {
  try {
    const provinces = await Province.find();
    res.status(201).json(provinces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProvince = async (req, res) => {
  try {
    const { id } = req.params;
    const province = await Province.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true },
    );

    if (!province)
      return res.status(400).json({ error: "Province is not found" });
    res.status(200).json(province);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProvince = async (req, res) => {
  try {
    const { id } = req.params;
    await Province.findByIdAndDelete("67a653b51eaf7e238fcd6bf3");
    res.status(201).json({ message: "Province is deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addLocal = async (req, res) => {
  try {
    const { provinceId } = req.params;
    const { name, totalBudget, spentBudget } = req.body;

    const province = await Province.findById(provinceId);
    if (!province)
      return res.status(404).json({ error: "province is not found" });

    province.locals.push({ name, totalBudget, spentBudget });
    await province.save();
    res.status(200).json(province);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAllLocal = async (req, res) => {
  try {
    const { provinceId } = req.params;
    const province = await Province.findById(provinceId).select("locals");

    if (!province)
      return res.status(404).json({ error: "province is not found" });
    res.status(200).json(province.locals);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const updateLocal = async (req, res) => {
  try {
    const { provinceId, localId } = req.params;
    const { name, totalBudget, spentBudget } = req.body;

    const province = await Province.findById(provinceId);
    if (!province) return res.status(404).json({ error: "Province not found" });

    const localIndex = province.locals.findIndex(
      (local) => local._id.toString() === localId,
    );
    if (localIndex === -1)
      return res.status(404).json({ error: "Local not found in the province" });

    if (name) province.locals[localIndex].name = name;
    if (totalBudget) province.locals[localIndex].totalBudget = totalBudget;
    if (spentBudget) province.locals[localIndex].spentBudget = spentBudget;

    await province.save();
    res.status(200).json(province);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLocal = async (req, res) => {
  try {
    const { provinceId, localId } = req.params;
    const province = await Province.findById(provinceId);
    if (!province)
      return res.status(404).json({ error: "province is not found" });

    province.locals = province.locals.filter(
      (local) => localId !== local._id.ToString(),
    );
    await province.save();

    res.status(201).json({ message: "Local is deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addProvince,
  getAllProvince,
  updateProvince,
  deleteProvince,
  addLocal,
  getAllLocal,
  updateLocal,
  deleteLocal,
};
