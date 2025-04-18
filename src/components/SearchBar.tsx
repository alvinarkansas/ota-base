import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getRecommendation } from "../services/api";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { ArrowRight, Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

type Props = {
  onSearch: (query: string) => void;
};

export const SearchBar = ({ onSearch }: Props) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 600);
  const { data, isLoading } = useQuery({
    queryKey: ["recommendation", debouncedQuery],
    queryFn: () => getRecommendation(debouncedQuery),
    enabled: !!debouncedQuery,
  });
  const recommendations = data?.data ?? [];

  return (
    <Combobox immediate={recommendations.length > 1} value={query}>
      <div className="relative">
        <ComboboxInput
          className="w-full lg:w-96 pl-6 py-4 rounded-full bg-ntrl-400 placeholder:text-ntrl-300 pr-16 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          displayValue={() => query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search anime..."
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch(query);
            }
          }}
        />
        {query && (
          <button
            className="absolute inset-y-1 right-1 bg-ntrl-500 p-3 rounded-full"
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
          >
            <X />
          </button>
        )}
      </div>

      <ComboboxOptions
        anchor={{ to: "bottom end", gap: 8 }}
        transition
        className="w-[var(--input-width)] rounded-3xl border border-white/5 bg-ntrl-400 p-1 empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
      >
        {!isLoading ? (
          <>
            <ComboboxOption
              value={null}
              className="group flex items-start justify-between cursor-default gap-2 rounded-3xl py-1.5 px-3 select-none data-[focus]:bg-white/10"
              onClick={() => {
                onSearch(debouncedQuery);
              }}
            >
              <span className="text-sm/6 text-white">
                Search for "{debouncedQuery}"
              </span>
              <Search />
            </ComboboxOption>
            {recommendations.map((recommendation) => (
              <ComboboxOption
                key={recommendation.mal_id}
                value={recommendation}
                className="group flex items-start justify-between cursor-default gap-2 rounded-3xl py-1.5 px-3 select-none data-[focus]:bg-white/10"
                onClick={() => {
                  navigate(`/anime/${recommendation?.mal_id}`);
                }}
              >
                <div className="text-sm/6 text-white">
                  {recommendation.title}
                </div>
                <ArrowRight className="shrink-0" />
              </ComboboxOption>
            ))}
          </>
        ) : (
          <div className="group flex cursor-default items-center gap-2 rounded-3xl py-1.5 px-3 select-none data-[focus]:bg-white/10">
            <span className="text-sm/6 text-white">Loading...</span>
          </div>
        )}
      </ComboboxOptions>
    </Combobox>
  );
};
