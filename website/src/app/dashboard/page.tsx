import { redirect } from "next/navigation";
import { resolvePostLoginRedirect } from "@/lib/auth-routing";

export default async function DashboardPage() {
  redirect(await resolvePostLoginRedirect());
}
