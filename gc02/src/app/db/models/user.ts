import { ObjectId } from "mongodb";
import { getDB } from "./db";
import bcrypt from "bcryptjs";
import { COLLECTION_USER } from "./constant";

interface UserModel {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
}

type CreateUserInput = Omit<UserModel, "_id">;

export const createUser = async (user: CreateUserInput) => {
  const db = await getDB();

  const modifiedUser: CreateUserInput = {
    ...user,
    password: bcrypt.hashSync(user.password),
  };

  const newUser = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const db = await getDB();

  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email })) as UserModel;

  return user;
};
