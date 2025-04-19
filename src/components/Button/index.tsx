import type { ButtonHTMLAttributes } from "react";

type Props = {
  "data-testid"?: string;
};

export const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & Props
) => {
  const { children, "data-testid": dataTestId = "", ...restProps } = props;
  return (
    <button
      className="bg-primary-200 hover:bg-primary-300 text-ntrl-100 px-8 py-4 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      data-testid={dataTestId}
      {...restProps}
    >
      {children}
    </button>
  );
};
