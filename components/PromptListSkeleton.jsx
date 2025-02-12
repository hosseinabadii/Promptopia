import React from "react";

export default function PromptListSkeleton({ numItems = 6 }) {
  return (
    <div className="prompt_layout">
      {[...Array(numItems)].map((_, index) => (
        <div className="prompt_card animate-pulse" key={index}>
          <div className="flex justify-between items-start gap-5">
            <div className="flex justify-start items-start gap-5 w-5/6">
              <div className="bg-gray-300 rounded-full h-10 w-10 aspect-square"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="bg-gray-300 rounded h-5"></div>
                <div className="bg-gray-300 rounded h-5"></div>
              </div>
            </div>

            <div className="bg-gray-300 w-7 h-7 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="bg-gray-300 rounded h-5"></div>
            <div className="bg-gray-300 rounded h-5 w-2/3"></div>
            <div className="bg-gray-300 rounded h-5 w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
