import type { ChangeEvent } from "react";
import { X } from "lucide-react";
import { ComboboxInput } from "@headlessui/react";

type Props = {
  query: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onEnter?: (query: string) => void;
  "data-testid-prefix"?: string;
};

export const SearchBarInput = ({
  query,
  onChange,
  onClear,
  onEnter,
  "data-testid-prefix": dataTestIdPrefix = "",
}: Props) => {
  return (
    <div className="relative">
      <ComboboxInput
        className="w-full lg:w-96 pl-6 py-4 pr-16 rounded-full bg-ntrl-400 placeholder:text-ntrl-300 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        displayValue={() => query}
        onChange={onChange}
        placeholder="Search anime..."
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onEnter?.(query);
          }
        }}
        data-testid={`${dataTestIdPrefix}txtfld_search`}
      />
      {query && (
        <button
          className="absolute inset-y-1 right-1 bg-ntrl-500 w-12 h-12 grid place-items-center rounded-full"
          onClick={onClear}
          data-testid={`${dataTestIdPrefix}btn_clear`}
        >
          <X />
        </button>
      )}
    </div>
  );
};
