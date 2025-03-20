"use client";

import { useState, type RefAttributes } from "react";
import { Button, type ButtonProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
// import Loader from "./loader";

// ================== TYPES ================== //
export type MainButtonProps = {
  title: string | number;
  icon?: JSX.Element;
  className?: string;
  iconPos?: "start" | "end";
  variant?: "primary" | "secondary" | "text" | "outlined" | "danger" | "tab" | "lightTab";
} & ButtonProps &
  RefAttributes<HTMLButtonElement>;

type IconButtonProps = Omit<MainButtonProps, "title"> & { isRound?: boolean };

// ================== CLIENT COMPONENT ================== //
export const MainButton = ({
  title,
  icon,
  className,
  iconPos = "start",
  variant = "primary",
  ...props
}: MainButtonProps) => {
  return (
    <Button
      {...props}
      className={twMerge(
        "flex gap-2 focus:outline-none items-center text-sm transition font-semibold rounded-full disabled:opacity-50",
        variant === "primary" && "bg-accent2 text-white px-8 py-3 shadow-md",
        variant === "text" && "bg-white text-base text-accent3",
        variant === "outlined" && "bg-white border px-8 py-3 shadow-sm",
        variant === "danger" && "bg-error text-white px-8 py-3",
        variant === "tab" && "bg-accent4 font-medium shadow-md px-4 py-1.5 cursor-default disabled:bg-border",
        variant === "lightTab" && "bg-lightBtn text-text3 px-8 py-3 shadow-sm",
        className
      )}
    >
      {iconPos === "start" && icon}
      {title}
      {iconPos === "end" && icon}
    </Button>
  );
};

export const IconButton = ({ icon, isRound, className, ...props }: IconButtonProps) => {
  return (
    <Button
      {...props}
      className={twMerge(`p-3 text-black outline-none ${isRound && "p-1 rounded-full hover:bg-border"}`, className)}
    >
      {icon}
    </Button>
  );
};

// export const RefreshButton = ({ icon, isRound, className, action, paramstype, ...props }: IconButtonProps) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (!paramstype) {
//       await action();
//     } else {
//       await action(paramstype);
//     }
//     window.location.reload();
//     setIsLoading(false);
//   };

//   return (
//     <>
//       <Button
//         {...props}
//         className={twMerge(`p-3 text-black outline-none ${isRound && "p-1 rounded-full hover:bg-border"}`, className)}
//         onClick={handleClick}
//       >
//         {icon}
//       </Button>
//       <Loader isOpen={isLoading} />
//     </>
//   );
// };

// export const BasicButton = ({ title, className, ...props }: MainButtonProps) => {
//   return (
//     <Button {...props} className={className}>
//       {title}
//     </Button>
//   );
// };

// export const ChooseFile = ({ title, className, onChange, ...props }) => {
//   return (
//     <>
//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         onChange={onChange}
//         className={className}
//         style={{ display: "none" }}
//         id="petty-cash-file-input"
//       />
//       <label
//         htmlFor="petty-cash-file-input"
//         className="flex gap-2 focus:outline-none items-center text-sm transition font-semibold rounded-full disabled:opacity-50  bg-accent2 text-white px-8 py-3 shadow-md"
//       >
//         Choose File
//       </label>
//     </>
//   );
// };
