import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = () => new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");

export const AUTH_COOKIE_NAME = "admin_token";

export async function signAdminToken(payload: { email: string; sub: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey());
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as { email: string; sub: string };
  } catch {
    return null;
  }
}

export async function getAdminFromCookies() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function requireAdmin(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${AUTH_COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  return verifyAdminToken(decodeURIComponent(match[1]));
}
