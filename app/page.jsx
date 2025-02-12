import { Suspense } from "react";
import SearchForm from "@/components/SearchForm";
import Feed from "@/components/Feed";
import PromptListSkeleton from "@/components/PromptListSkeleton";

export default async function Home(props) {
  const searchParams = await props.searchParams;
  const search = searchParams.query || "";

  return (
    <section className="w-full flex_center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <SearchForm />
      <Suspense fallback={<PromptListSkeleton />}>
        <Feed search={search} />
      </Suspense>
    </section>
  );
}
