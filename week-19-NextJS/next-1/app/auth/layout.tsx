import { NavBar } from "@/components/navbar";

export default function Authlayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
