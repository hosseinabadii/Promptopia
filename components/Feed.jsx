import { fetchPrompts } from "@/lib/database";
import PromptList from "./PromptList";

export default async function Feed({ search }) {
  const prompts = await fetchPrompts({ search });

  return <PromptList prompts={prompts} />;
}
