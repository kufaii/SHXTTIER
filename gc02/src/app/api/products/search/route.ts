import { getProductByName } from "@/app/db/models/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const query = request.nextUrl.searchParams;

    const name = query.get("name") ?? ("" as string);

    const products = await getProductByName(name);

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
