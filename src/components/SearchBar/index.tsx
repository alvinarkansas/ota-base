import { useState } from "react";
import { Combobox, ComboboxOptions } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ArrowRight, Search } from "lucide-react";
import { SearchBarInput } from "../SearchBarInput";
import { SearchBarSuggestion } from "../SearchBarSuggestion";
import { useGetSearchSuggestions } from "../../hooks/useGetSearchSuggestions";

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
  const navigate = useNavigate();
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
      <ComboboxOptions
        anchor={{ to: "bottom end", gap: 8 }}
        transition
        className="w-[var(--input-width)] rounded-3xl border border-white/5 bg-ntrl-400 p-1 empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
      >
        {!isLoading ? (
          <>
            <SearchBarSuggestion
              value={null}
              icon={<Search />}
              label={`Search for "${debouncedQuery}"`}
              onClick={() => {
                onSearch(debouncedQuery);
              }}
              label-data-testid={`${dataTestIdPrefix}txt_query_label`}
              icon-data-testid={`${dataTestIdPrefix}img_query_icon`}
            />
            {data.map((suggestion, index) => (
              <SearchBarSuggestion
                key={suggestion.mal_id}
                value={suggestion}
                label={suggestion.title}
                icon={<ArrowRight />}
                onClick={() => {
                  navigate(`/anime/${suggestion?.mal_id}`, {
                    state: { detail: suggestion },
                  });
                }}
                label-data-testid={`${dataTestIdPrefix}txt_label-${index + 1}`}
                icon-data-testid={`${dataTestIdPrefix}img_icon-${index + 1}`}
              />
            ))}
          </>
        ) : (
          <SearchBarSuggestion
            value={null}
            label="Loading..."
            label-data-testid={`${dataTestIdPrefix}txt_label`}
          />
        )}
      </ComboboxOptions>
    </Combobox>
  );
};
