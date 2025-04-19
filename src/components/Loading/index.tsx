import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex gap-4">
      <LoaderCircle className="animate-spin" />
      <span>Loading</span>
    </div>
  );
};
