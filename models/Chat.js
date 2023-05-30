import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    members: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
