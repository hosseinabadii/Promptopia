"use client";

import { useActionState } from "react";
import Link from "next/link";

export default function From({ type, initialState, handleFormAction }) {
  const [state, formAction, isPending] = useActionState(
    handleFormAction,
    initialState
  );

  return (
    <section className="w-full max-w-full flex_start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        action={formAction}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            defaultValue={state?.prompt}
            name="prompt"
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            defaultValue={state?.tag}
            name="tag"
            placeholder="tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex_end mx-3 mb-5 gap-4">
          <Link href="/profile" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {isPending ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
