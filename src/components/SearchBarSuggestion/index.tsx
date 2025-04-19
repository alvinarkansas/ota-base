import { ComboboxOption } from "@headlessui/react";
import type { Anime } from "@/types/anime";

type Props = {
  label: string;
  value: Anime | null;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export const SearchBarSuggestion = ({ value, onClick, label, icon }: Props) => {
  return (
    <ComboboxOption
      value={value}
      className="group flex items-start justify-between cursor-default gap-2 rounded-3xl py-1.5 px-3 select-none data-[focus]:bg-white/10"
      onClick={onClick}
    >
      <span className="text-sm/6 text-white">{label}</span>
      {icon ? icon : null}
    </ComboboxOption>
  );
};
