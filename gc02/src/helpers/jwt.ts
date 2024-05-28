import * as jose from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("Provide JWT_SECRET");
}

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const createToken = async (payload: jose.JWTPayload) => {
  const token = new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(SECRET);

  return token;
};

export const verifyToken = async (token: string) => {
  const payloadJose = await jose.jwtVerify(token, SECRET);
  return payloadJose.payload;
};
