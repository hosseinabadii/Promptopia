"use server";

import { redirect } from "next/navigation";

export async function searchAction(formData) {
  const search = formData.get("search");
  redirect(`/?query=${search}`);
}
