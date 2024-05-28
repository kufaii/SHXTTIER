import { getUserByEmail } from "@/app/db/models/user";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.JWT_SECRET as string;

const User = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();
    const validate = User.safeParse(body);
    if (!validate.success) {
      throw validate.error;
    }
    const user = await getUserByEmail(body.email);

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Email or Password",
        },
        {
          status: 401,
        }
      );
    }

    const isValdi = bcrypt.compareSync(body.password, user.password);

    if (!isValdi) {
      return NextResponse.json(
        {
          message: "Invalid Email or Password",
        },
        {
          status: 401,
        }
      );
    }

    const access_token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      JWT_SECRET
    );

    const response = NextResponse.json({
      data: {
        access_token,
      },
    });

    response.cookies.set("Authorization", `Bearer ${access_token}`);

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message;

      return NextResponse.json(
        {
          message: `${errPath} ${errMessage.toLocaleLowerCase}`,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
