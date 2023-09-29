const model = require("../models/model.js");

// Post /api/brand
async function createBrand(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not provided");
  const { name } = req.body;

  try {
    const create = await new model.Brand({
      name,
    });

    await create.save();
    return res.status(201).json({ success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating brand ${err}` });
  }
}

// Post /api/battery
async function createBattery(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not provided");
  const { brand, model: Model, risk, reference, capacity } = req.body;

  try {
    const create = await new model.Battery({
      brand,
      model: Model,
      risk,
      reference,
      capacity,
    });

    await create.save();
    return res.status(201).json({ success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating battery ${err}` });
  }
}

// get /api/brand
async function getBrand(req, res) {
  let data = await model.Brand.find({});
  return res.json(data);
}

// get /api/battery
async function getBattery(req, res) {
  let data = await model.Battery.find({});
  return res.json(data);
}

// delete /api/brand
async function deleteBrand(req, res) {
  if (!req.body)
    return res.status(400).json({ message: "Request body not found" });

  try {
    await model.Brand.deleteOne(req.body);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while creating brand ${err}` });
  }
}

// delete /api/battery
async function deleteBattery(req, res) {
  if (!req.body)
    return res.status(400).json({ message: "Request body not found" });
  try {
    await model.Battery.deleteOne(req.body);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error while deleting battery ${err}` });
  }
}

module.exports = {
  createBrand,
  getBrand,
  deleteBrand,
  createBattery,
  getBattery,
  deleteBattery,
};
