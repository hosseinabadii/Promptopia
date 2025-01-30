"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function PromptCard({ prompt }) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCopy = (text) => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <>
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-start gap-5 cursor-pointer">
            <Image
              src={prompt.creator?.image}
              alt="Profile Picture"
              width="40"
              height="40"
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {prompt.creator?.displayName}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {prompt.creator?.email}
              </p>
            </div>
          </div>

          <div className="copy_btn" onClick={() => handleCopy(prompt.prompt)}>
            <Image
              src={
                copied === prompt.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width="12"
              height="12"
              alt="Copy Prompt"
            />
          </div>
        </div>

        <p className="my-4 font-satoshi text-sm text-gray-700">
          {prompt.prompt}
        </p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => router.push(`/?query=${prompt.tag}`)}
        >
          #{prompt.tag}
        </p>

        {session?.user.id === prompt.creator?._id &&
          pathName === "/profile" && (
            <div className="mt-5 flex_center gap-5 border-t border-gray-100 pt-3">
              <Link href={`/prompt/update?promptId=${prompt._id}`}>
                <p className="font-inter text-sm green_gradient">Edit</p>
              </Link>
              <p
                className="font-inter text-sm orange_gradient cursor-pointer"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </p>
            </div>
          )}
      </div>
      {confirmDelete && (
        <ConfirmDeleteModal
          promptId={prompt._id}
          onClose={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}
