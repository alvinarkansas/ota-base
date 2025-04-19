import { ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ComboboxOptions } from "@headlessui/react";
import type { Anime } from "@/types/anime";
import { SearchBarSuggestion } from "../SearchBarSuggestion";

type Props = {
  isLoading: boolean;
  onContinueSearch: (query: string) => void;
  debouncedQuery: string;
  suggestions: Anime[];
  "data-testid-prefix"?: string;
};

export const SearchBarSuggestions = ({
  isLoading,
  debouncedQuery,
  onContinueSearch,
  suggestions,
  "data-testid-prefix": dataTestIdPrefix = "",
}: Props) => {
  const navigate = useNavigate();

  return (
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
              onContinueSearch(debouncedQuery);
            }}
            label-data-testid={`${dataTestIdPrefix}txt_query_label`}
            icon-data-testid={`${dataTestIdPrefix}img_query_icon`}
          />
          {suggestions.map((suggestion, index) => (
            <SearchBarSuggestion
              key={suggestion.mal_id}
              value={suggestion}
              label={suggestion.title}
              icon={<ArrowRight className="shrink-0" />}
              onClick={() => {
                navigate(`/anime/${suggestion?.mal_id}`);
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
  );
};
