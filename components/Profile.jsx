import { fetchUserPromptsById } from "@/lib/database";
import PromptList from "./PromptList";

export default async function Profile({ userId }) {
  const prompts = await fetchUserPromptsById(userId);

  return <PromptList prompts={prompts} />;
}
