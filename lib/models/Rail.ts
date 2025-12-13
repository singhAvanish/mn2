import mongoose from "mongoose";

const RailSchema = new mongoose.Schema({
  rail_pos: { type: Number, required: true },
  rail_name: { type: String, required: true },
  rail_items: { type: Array, default: [] },
  orderIndex: { type: Number, default: 0 },
});

// ⭐ FIX — Prevent OverwriteModelError
export default mongoose.models.Rail || mongoose.model("Rail", RailSchema);
