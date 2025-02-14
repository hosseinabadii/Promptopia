import { auth } from "@/auth";
import PromptCard from "./PromptCard";

export default async function PromptList({ prompts }) {
  const session = await auth();
  return (
    <>
      {prompts ? (
        prompts.length > 0 ? (
          <div className="prompt_layout">
            {prompts.map((prompt) => (
              <PromptCard key={prompt._id} prompt={prompt} session={session} />
            ))}
          </div>
        ) : (
          <div className="fetch_error">
            <p>No prompts found</p>
          </div>
        )
      ) : (
        <div className="fetch_error">
          <p>failed to fetch prompts</p>
        </div>
      )}
    </>
  );
}
