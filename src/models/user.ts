import mongoose, { Schema, Document } from "mongoose";
import { faker } from "@faker-js/faker";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isDisable: boolean;
  role: string;
}

const UserScheme: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    isDisable: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
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

export const getUserById = (id: string) => UserModel.findOne({ _id: id });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const updateUser = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export const deleteUser = (id: string) =>
  UserModel.findByIdAndUpdate(id, { isDisable: false }, { new: true });

export async function generateFakeUser() {
  for (let index = 0; index < 50; index++) {
    await createUser({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      isDisable: false,
    });
  }
}
