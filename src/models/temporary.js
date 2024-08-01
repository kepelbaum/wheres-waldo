import mongoose from "mongoose";

const tempSchema = new mongoose.Schema({
  waldo: { type: Boolean, required: true },
  odlaw: { type: Boolean, required: true },
  whitebeard: { type: Boolean, required: true },
  map: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  score: { type: Date },
});

const Temp = mongoose.model("Temp", tempSchema);

export default Temp;
