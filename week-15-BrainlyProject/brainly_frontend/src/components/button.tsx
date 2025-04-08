import { ReactElement } from "react";

interface buttonprop {
  variant: "primary" | "secondary" | "signup";
  starticon?: ReactElement;
  text: String;
  onclick?: () => void;
  fullwidth?: Boolean;
  loading?: Boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white p-4 ",
  secondary: "bg-purple-300 text-white p-4",
  signup: "bg-blue-500 text-white p-4",
};

const defaultClasses =
  "px-4 py-2 rounded-md flex items-center text-sm cursor-pointer  ";

export function ButtonComponent({
  variant,
  starticon,
  text,
  onclick,
  fullwidth,
  loading,
}: buttonprop) {
  return (
    <button
      onClick={onclick}
      className={
        variantClasses[variant] +
        " " +
        defaultClasses +
        `${fullwidth ? " w-full flex justify-center items-center" : ""}` +
        `${loading ? " bg-gray-500" : ""}`
      }
    >
      <div className="pr-2">{starticon}</div>
      {text}
    </button>
  );
}
