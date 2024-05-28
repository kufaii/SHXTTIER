import { ObjectId } from "mongodb";
import { getDB } from "./db";
import { COLLECTION_WISHLIST } from "./constant";

interface WishlistModel {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: number;
  updatedAt: number;
}

type CreateWishlistInput = Omit<WishlistModel, "_id">;

export const createWishlist = async (userId: string, productId: string) => {
  const db = await getDB();
  const modifiedUserId = new ObjectId(userId);
  const modifiedProductId = new ObjectId(productId);

  const input: CreateWishlistInput = {
    userId: modifiedUserId,
    productId: modifiedProductId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const newWishlist = await db.collection(COLLECTION_WISHLIST).insertOne(input);

  return newWishlist;
};

export const deleteWishlist = async (userId: string, productId: string) => {
  const db = await getDB();
  const modifiedUserId = new ObjectId(userId);
  const modifiedProductId = new ObjectId(productId);

  const query = {
    userId: modifiedUserId,
    productId: modifiedProductId,
  };

  const result = await db.collection(COLLECTION_WISHLIST).deleteOne(query);

  return result;
};

export const getWishlist = async (userId: string): Promise<WishlistModel[]> => {
  const db = await getDB();
  const agg = [
    {
      $match: {
        userId: new ObjectId(`${userId}`),
      },
    },
    {
      $lookup: {
        from: "Products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
  ];

  const wishlistData = (await db
    .collection(COLLECTION_WISHLIST)
    .aggregate(agg)
    .toArray()) as WishlistModel[];

  return wishlistData;
};
