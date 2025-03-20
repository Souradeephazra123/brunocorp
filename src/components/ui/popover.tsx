// react-aria-components
import { Popover, type PopoverProps } from "react-aria-components";

export default function CustomPopover(props: PopoverProps) {
  return (
    <Popover
      {...props}
      className={({ isEntering, isExiting }) => `
          overflow-auto rounded-lg drop-shadow-lg ring-1 ring-black/10 bg-white
          ${
            isEntering
              ? "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 ease-out duration-200"
              : ""
          }
          ${
            isExiting
              ? "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 ease-in duration-150"
              : ""
          }
        `}
    />
  );
}
