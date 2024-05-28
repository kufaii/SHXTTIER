import { createProduct, getAllProduct } from "@/app/db/models/products";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const parsedData = z
      .object({
        name: z.string(),
        slug: z.string(),
      })
      .safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const newProduct = await createProduct(data);

    return Response.json(
      {
        data: data,
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
    // const headerList = headers();
    // const userId = headerList.get("x-user-id");

    const query = request.nextUrl.searchParams;

    const limit = (Number(query.get("limit")) ?? 4) as number;
    const page = (Number(query.get("page")) ?? 1) as number;

    const products = await getAllProduct(page, limit);

    // const response = NextResponse.json({
    //   data: {
    //     products,
    //   },
    // });

    return Response.json({
      status: 200,
      products,
    });
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
