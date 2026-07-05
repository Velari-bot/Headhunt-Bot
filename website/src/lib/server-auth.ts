import { NextRequest } from "next/server";

export function verifyServerSecret(request: NextRequest, bodySecret?: string): boolean {
  const secret = process.env.MINECRAFT_SERVER_SECRET;
  if (!secret) return false;

  const headerSecret = request.headers.get("x-server-secret");
  return headerSecret === secret || bodySecret === secret;
}
