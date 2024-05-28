import { getMongoClientInstance } from "../config";
import { DATABASE } from "./constant";

export const getDB = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE);
  return db;
};
