import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true, trim: true },
    shortId: { type: String, required: true, unique: true, index: true, trim: true },
    clicks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Url", urlSchema);
