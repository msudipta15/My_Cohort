import { ReactElement } from "react";

interface items {
  text: String;
  icon: ReactElement;
}

export function SidebarItems({ text, icon }: items) {
  return (
    <div className="flex items-center text-gray-700 ">
      <div className="p-3 ">{icon}</div>
      <div className="p-3">{text}</div>
    </div>
  );
}
