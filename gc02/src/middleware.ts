import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./helpers/jwt";
import * as jose from "jose";

interface PayloadPLus extends jose.JWTPayload {
  _id: string;
  name: string;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    let cookieAuth = cookies().get("Authorization");
    let token;

    if (cookieAuth) {
      token = cookieAuth.value.split(" ")[1];
    } else {
      throw new Error("invalid token");
    }

    const payload = (await verifyToken(token)) as PayloadPLus;

    if (!payload) {
      throw new Error("invalid token");
    }

    const reqHeader = new Headers(request.headers);
    reqHeader.set("x-user-id", payload._id);
    reqHeader.set("x-user-name", payload.name);

    return NextResponse.next({
      headers: reqHeader,
    });
  } catch (error) {
    let status = 500;
    let message = "Internal server error";

    if (error instanceof Error) {
      if (error.message == "invalid token") {
        status = 401;
        message = error.message;
      }
    }

    return NextResponse.json(
      {
        message,
      },
      {
        status,
      }
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/api/products/:path*",
  // matcher: "/api/users/:path*",
  matcher: "/api/users/wishlist",
};
