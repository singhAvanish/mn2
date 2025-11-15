import mongoose from "mongoose";

delete mongoose.models.Rail;   // <-- FORCE DELETE OLD MODEL

const RailSchema = new mongoose.Schema({
  rail_pos: { type: Number, required: true },
  rail_name: { type: String, required: true },
  rail_items: { type: Array, default: [] },
  orderIndex: { type: Number, default: 0 },
});

export default mongoose.model("Rail", RailSchema);
