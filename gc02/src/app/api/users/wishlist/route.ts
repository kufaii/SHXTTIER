import {
  createWishlist,
  deleteWishlist,
  getWishlist,
} from "@/app/db/models/wishlist";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

const WishList = z.object({
  userId: z.string(),
  productId: z.string(),
});

export async function POST(request: Request) {
  try {
    const data: { productId: string } = await request.json();
    const headerList = headers();
    const userId = headerList.get("x-user-id") as string;
    // const validate = WishList.safeParse(data);
    // if (!validate.success) {
    //   throw validate.error;
    // }

    const addWishlist = await createWishlist(userId, data.productId);

    return Response.json(
      {
        data: {
          wishlistStatus: addWishlist,
          newWishlist: {
            _id: addWishlist.insertedId,
            userId: userId,
            productId: data.productId,
          },
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const data: { productId: string } = await request.json();
    const headerList = headers();
    const userId = headerList.get("x-user-id") as string;

    // const validate = WishList.safeParse(data);
    // if (!validate.success) {
    //   throw validate.error;
    // }

    const removeWishlist = await deleteWishlist(userId, data.productId);

    return Response.json(
      {
        data: {
          wishlistStatus: removeWishlist,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const headerList = headers();
    const userId = headerList.get("x-user-id") as string;

    // const validate = findWishlist.safeParse(userId);
    // if (!validate.success) {
    //   throw validate.error;
    // }

    const wishlistList = await getWishlist(userId);

    return Response.json(
      {
        data: {
          wishlistList,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        status: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
