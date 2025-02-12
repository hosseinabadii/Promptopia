import Form from "next/form";

export default function SearchForm() {
  return (
    <div className="search_container">
      <Form action="/" className="relative w-full flex_center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          name="query"
          required
          className="search_input peer"
        />
      </Form>
    </div>
  );
}
