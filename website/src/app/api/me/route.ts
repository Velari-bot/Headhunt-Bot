import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserById, serializeUser } from "@/lib/user-data";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(serializeUser(user));
}
