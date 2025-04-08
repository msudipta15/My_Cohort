import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { AddContentModel } from "../components/AddContentModel";
import { ButtonComponent } from "../components/button";
import { Plusicon } from "../icons/plusicon";
import { Shareicon } from "../icons/shareicon";
import { CardComponent } from "../components/card";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modelOpen]);

  return (
    <div>
      <Sidebar />

      <div className="p-4 bg-slate-200 h-full ml-72 relative">
        <AddContentModel
          open={modelOpen}
          onclose={() => {
            setModelOpen(false);
          }}
        />
        <div className="flex justify-end gap-2 mb-2  ">
          <ButtonComponent
            onclick={() => {
              setModelOpen(true);
            }}
            variant="primary"
            text={"Add Content"}
            starticon={Plusicon()}
          />
          <ButtonComponent
            variant="secondary"
            text={"Share Brain"}
            starticon={Shareicon()}
            onclick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/share`,
                { share: true },
                {
                  headers: { token: localStorage.getItem("token") },
                }
              );
              const shareURL = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareURL);
            }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {contents.map(({ title, type, link, _id }) => (
            <div>
              <CardComponent
                type={type}
                link={link}
                title={title}
                contentid={_id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
