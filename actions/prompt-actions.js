"use server";

import { redirect } from "next/navigation";
import { deletePrompt, createPrompt, updatePrompt } from "@/lib/database";

export const handleDeletePrompt = async (promptId) => {
  try {
    await deletePrompt(promptId);
  } catch (error) {
    console.log(error);
  }
  redirect("/profile");
};

export const createPromptAction = async (userId, _preState, formData) => {
  try {
    const newPromptData = {
      creator: userId,
      prompt: formData.get("prompt") || "",
      tag: formData.get("tag") || "",
    };
    await createPrompt(newPromptData);
  } catch (error) {
    console.log(error);
  }
  redirect("/profile");
};

export const updatePromptAction = async (promptId, _preState, formData) => {
  try {
    const updatedPromptData = {
      prompt: formData.get("prompt") || "",
      tag: formData.get("tag") || "",
    };
    await updatePrompt(promptId, updatedPromptData);
  } catch (error) {
    console.log(error);
  }
  redirect("/profile");
};
