import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserById } from "@/lib/user-data";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect("/");
  }

  return user;
}

export async function requireMinecraftLinked() {
  const user = await requireAuth();

  if (!user.minecraftAccount) {
    redirect("/profile");
  }

  return user;
}

export async function resolvePostLoginRedirect() {
  const session = await auth();

  if (!session?.user?.id) {
    return "/";
  }

  const user = await getUserById(session.user.id);

  if (!user?.minecraftAccount) {
    return "/profile";
  }

  return "/market";
}
