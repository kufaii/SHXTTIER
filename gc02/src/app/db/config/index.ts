import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI as string;

if (!connectionString) {
  throw new Error("Missing connection string");
}

let client: MongoClient;

export const getMongoClientInstance = async () => {
  if (!client) {
    client = new MongoClient(connectionString);
    await client.connect();
  }

  return client;
};
