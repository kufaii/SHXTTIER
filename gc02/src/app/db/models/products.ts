import { ObjectId } from "mongodb";
import { getDB } from "./db";
import { COLLECTION_PRODUCTS } from "./constant";

export interface ProductModel {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

type CreateProductInput = Omit<ProductModel, "_id">;

export const createProduct = async (product: CreateProductInput) => {
  const db = await getDB();

  const newProduct = await db
    .collection(COLLECTION_PRODUCTS)
    .insertOne(product);

  return newProduct;
};

export const getAllProduct = async (
  page: number,
  limit: number
): Promise<ProductModel[]> => {
  const db = await getDB();
  const skip = (page - 1) * limit;

  const product = (await db
    .collection(COLLECTION_PRODUCTS)
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray()) as ProductModel[];

  return product;
};

export const getProductBySlug = async (slug: string): Promise<ProductModel> => {
  const db = await getDB();
  const query = {
    slug,
  };

  const product = await db.collection(COLLECTION_PRODUCTS).findOne(query);

  return product as ProductModel;
};

export const getProductByName = async (
  keyword: string
): Promise<ProductModel[]> => {
  const db = await getDB();
  const query = {
    name: { $regex: new RegExp(keyword, "i") }, // 'i' for case-insensitive
  };

  const products = await db
    .collection(COLLECTION_PRODUCTS)
    .find(query)
    .toArray();

  return products as ProductModel[];
};
