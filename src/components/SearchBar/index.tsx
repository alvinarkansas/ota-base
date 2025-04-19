import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useDebounce } from "use-debounce";
import { useGetSearchSuggestions } from "../../hooks/useGetSearchSuggestions";
import { SearchBarInput } from "../SearchBarInput";
import { SearchBarSuggestions } from "../SearchBarSuggestions";

type Props = {
  onSearch: (query: string) => void;
  defaultValue?: string;
  "data-testid-prefix"?: string;
};

export const SearchBar = ({
  onSearch,
  defaultValue,
  "data-testid-prefix": dataTestIdPrefix = "",
}: Props) => {
  const [query, setQuery] = useState(defaultValue ?? "");
  const [debouncedQuery] = useDebounce(query, 600);
  const { data, isLoading } = useGetSearchSuggestions(debouncedQuery);

  return (
    <Combobox immediate={data.length > 1} value={query}>
      <SearchBarInput
        query={query}
        onEnter={onSearch}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        onClear={() => {
          setQuery("");
          onSearch("");
        }}
        data-testid-prefix={dataTestIdPrefix}
      />
      <SearchBarSuggestions
        debouncedQuery={debouncedQuery}
        isLoading={isLoading}
        onContinueSearch={() => {
          onSearch(debouncedQuery);
        }}
        suggestions={data}
      />
    </Combobox>
  );
};
