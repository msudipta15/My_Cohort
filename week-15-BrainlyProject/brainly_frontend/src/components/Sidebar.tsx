import { Twitter } from "../icons/twitter";
import { Youtube } from "../icons/youtube";
import { SidebarItems } from "./sidebarItems";

export function Sidebar() {
  return (
    <div className="h-screen w-72 fixed bg-white border border-gray-100 ">
      <div className="flex text-4xl text-blue-400 font-bold pt-4 pl-8">
        Brainly
      </div>
      <div className="pt-8 pl-4">
        <SidebarItems icon={<Twitter />} text={"Twitter"} />
        <SidebarItems icon={<Youtube />} text={"Youtube"} />
      </div>
    </div>
  );
}
