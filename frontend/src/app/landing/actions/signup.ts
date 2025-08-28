"use server";
import { signUp } from "../../../lib/auth";
import { redirect } from "next/navigation";

export async function signUpAction(
  email: string,
  password: string,
  handle: string
) {
  const res = await signUp(email, password, handle);
  if (!res.success) {
    redirect("/landing");
  }

  redirect("/");
}
