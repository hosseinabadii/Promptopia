import { notFound } from "next/navigation";
import { getPromptById } from "@/lib/database";
import { auth } from "@/auth";
import { updatePromptAction } from "@/actions/prompt-actions";
import Form from "@/components/From";
import NotAuthorized from "@/components/NotAuthorized";

export default async function UpdatePrompt(props) {
  const session = await auth();
  const user = session?.user;
  const searchParams = await props.searchParams;
  const promptId = searchParams.promptId;

  if (!promptId) {
    notFound();
  }

  const prompt = await getPromptById(promptId);
  if (!prompt) {
    notFound();
  }

  if (!user || prompt.creator?._id !== user?.id) {
    return (
      <NotAuthorized
        message={
          "You must be logged in and the creator of this prompt to update it."
        }
      />
    );
  }

  const initialState = {
    prompt: prompt?.prompt,
    tag: prompt?.tag,
  };
  return (
    <Form
      type="Update"
      initialState={initialState}
      handleFormAction={updatePromptAction.bind(null, promptId)}
    />
  );
}
