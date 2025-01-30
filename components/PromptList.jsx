import PromptCard from "./PromptCard";

export default function PromptList({ prompts }) {
  return (
    <>
      {prompts ? (
        prompts.length > 0 ? (
          <div className="prompt_layout">
            {prompts.map((prompt) => (
              <PromptCard key={prompt._id} prompt={prompt} />
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
