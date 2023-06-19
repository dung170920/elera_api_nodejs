import mongoose, { Schema, Document } from "mongoose";
import { faker } from "@faker-js/faker";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isDisable: boolean;
  // role: string;
}

const UserScheme: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: false },
  isDisable: { type: Boolean, default: false },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", UserScheme);

export const getUsers = () => UserModel.find({ isDisable: true });

export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email: email });

export const getUserById = (id: string) => UserModel.findOne({ _id: id });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const updateUser = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export const disableUser = (id: string) =>
  UserModel.findByIdAndUpdate(id, { isDisable: true }, { new: true });

export async function generateFakeUser() {
  // const user = {
  //   name: faker.person.fullName(),
  //   email: faker.internet.email(),
  //   avatar: faker.image.avatar(),
  //   password: faker.internet.password(),
  //   isDisable: false,
  // };

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
