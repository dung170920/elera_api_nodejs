import { Request } from "express";
import { IUser } from "../db/models";

export interface IRequest extends Request {
  user: IUser;
}
