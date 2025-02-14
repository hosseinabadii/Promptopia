import { auth } from "@/auth";
import { createPromptAction } from "@/actions/prompt-actions";
import Form from "@/components/From";
import NotAuthorized from "@/components/NotAuthorized";

export default async function CreatePrompt() {
  const session = await auth();
  const user = session?.user;

  if (!user)
    return (
      <NotAuthorized message={"You must be logged in to create a prompt."} />
    );

  const initialState = {
    prompt: "",
    tag: "",
  };

  return (
    <Form
      type="Create"
      initialState={initialState}
      handleFormAction={createPromptAction.bind(null, user?.id)}
    />
  );
}
