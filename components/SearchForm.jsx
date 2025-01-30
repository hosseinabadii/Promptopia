import { searchAction } from "@/actions/search-actions";

export default function SearchForm() {
  return (
    <div className="search_container">
      <form action={searchAction} className="relative w-full flex_center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          name="search"
          required
          className="search_input peer"
        />
      </form>
    </div>
  );
}
