import { redirect } from "next/navigation";
import { deleteCookie } from "@/lib/cookieUtils";

export default async function LogoutPage() {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  await deleteCookie("better-auth.session_token");
  redirect("/");
}
