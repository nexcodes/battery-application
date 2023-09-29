const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brand_model = new Schema({
  name: { type: String },
});

const battery_model = new Schema({
  brand: { type: String },
  model: { type: String },
  risk: { type: String },
  reference: { type: String },
  capacity: { type: String },
});

const Brand = mongoose.model("brand", brand_model);
const Battery = mongoose.model("battery", battery_model);

// export default Transactions

module.exports = {
  Brand,
  Battery,
};
