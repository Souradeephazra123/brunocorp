import { type FieldError } from "react-hook-form";

// ================== || CLIENT COMPONENT || ================== //
export function ErrorField({ message, className }: { message: string | FieldError; className?: string }) {
  return (
    <div className={`text-error text-xs text-left mt-1 ml-1 err ${className}`}>
      <p data-error className="block">
        {typeof message === "string" ? message : message.message}
      </p>
    </div>
  );
}
