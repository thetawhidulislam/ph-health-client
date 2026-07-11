import { redirect } from "next/navigation";
import { logoutUser } from "@/services/auth.service";

export default async function LogoutPage() {
  await logoutUser();
  redirect("/login");
}
