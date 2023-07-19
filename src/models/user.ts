import mongoose, { Schema } from "mongoose";
import { currentDate, formatToJson } from "../utils";
import { IUser, Role } from "../shared";

const UserScheme: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    isDisable: { type: Boolean, default: false },
    password: { type: String },
    googleId: { type: String },
    role: {
      type: String,
      default: Role.user,
      enum: Role,
    },
    createAt: {
      type: Date,
      default: currentDate(),
    },
  },
  {
    toJSON: formatToJson,
  }
);

const UserModel = mongoose.model<IUser>("User", UserScheme);

export const getUserList = (
  pageNumber: number,
  pageSize: number,
  role?: string
) =>
  UserModel.find(role ? { isDisable: false, role } : { isDisable: false })
    .sort({ _id: -1 })
    .select("-password")
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

export const countUsers = (role?: string) =>
  UserModel.countDocuments(
    role ? { isDisable: false, role } : { isDisable: false }
  );

export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email, isDisable: false });

export const getUserByGoogleId = (id: string) =>
  UserModel.findOne({ googleId: id });

export const getUserById = (id: string) => UserModel.findOne({ _id: id });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save();

export const updateUser = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values, {
    new: true,
  }).exec();

export const deleteUser = (id: string) =>
  UserModel.findByIdAndUpdate(id, { isDisable: false }, { new: true });
