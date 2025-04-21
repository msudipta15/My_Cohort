import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="m-4">Header......</div>
      {children}
      <div className="m-4">Footer..</div>
    </div>
  );
}
