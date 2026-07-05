import { redirect } from "next/navigation";
import { resolvePostLoginRedirect } from "@/lib/auth-routing";

export default async function LoginPage() {
  redirect(await resolvePostLoginRedirect());
}
