import { Dispatch, SetStateAction } from "react";

/**
 * Search input component
 * @returns JSX.Element
 */
interface SearchInputProps {
  setSearch: Dispatch<SetStateAction<string>>;
}
export default function SearchInput(props: SearchInputProps): JSX.Element {
  const { setSearch } = props;

  return (
    <input
      type="text"
      placeholder="Search for an user"
      className="w-full border border-black p-3 text-sm text-black placeholder-black focus:outline-black/80"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
