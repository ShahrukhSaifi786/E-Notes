import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model("users", UserSchema);
// const user = model("users", UserSchema);
// user.createIndexes();
// export default user;
