import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-routing";

export default async function LinkPage() {
  await requireAuth();
  redirect("/profile");
}
