import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: false },
  isDisable: { type: Boolean, default: false },
  authentication: {
    password: { type: String, required: true, select: false },
  },
});

const UserModel = mongoose.model("User", UserScheme);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email: email });

export const getUserById = (id: string) => UserModel.findOne({ _id: id });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const updateUser = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export const disableUser = (id: string) =>
  UserModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
