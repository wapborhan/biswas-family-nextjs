import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    provider: String,
    providerAccountId: String,
    image: String,
  },
  { timestamps: true }
);

// Prevent model overwrite issue in Next.js (hot-reloading)
const User = mongoose.models?.User || mongoose.model("users", UserSchema);

export default User;
