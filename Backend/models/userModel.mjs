import mongoose from "mongoose";
// const Schema= mongoose.Schema;
const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: [true, "username is Required"] },
  email: { type: String, RegExp: /.+\@.+\..+/, required: [true, "email is Required"] },
  password: { type: String, required: [true, "password is Required"] },
  image: { type: String },
  role: { type: String, default:"user" },
  
});
const User = mongoose.model("User", userSchema);
export default User;