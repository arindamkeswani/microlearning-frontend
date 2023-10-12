import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, className = "", ...rest }) => {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center shadow p-3 bg-primary rounded-lg transform transition-all ease-in-out text-white font-semibold text-sm active:scale-[.98] active:duration-75 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-[1] disabled:active:scale-[1]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
