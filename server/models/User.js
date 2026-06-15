const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["admin", "trainer", "member"], default: "member" },
  phone:    { type: String },
  address:  { type: String },
  age:      { type: Number },
  gender:   { type: String, enum: ["male", "female", "other"] },
  avatar:   { type: String },
  isActive: { type: Boolean, default: true },
  assignedTrainer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", userSchema);
