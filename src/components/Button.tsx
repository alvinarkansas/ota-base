import type { ButtonHTMLAttributes } from "react";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, ...restProps } = props;
  return (
    <button
      className="bg-primary-200 hover:bg-primary-300 text-ntrl-100 px-8 py-4 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      {...restProps}
    >
      {children}
    </button>
  );
};
