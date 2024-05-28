import { createUser } from "@/app/db/models/user";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const parsedData = z
      .object({
        email: z.string().email(),
        password: z.string().min(5),
        username: z.string(),
      })
      .safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const newUser = await createUser(data);

    return Response.json(
      { data: { userStatus: newUser, newUser: data } },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
