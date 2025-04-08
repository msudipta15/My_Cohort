import { useRef, useState } from "react";
import { Crossicon } from "../icons/crossicon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ButtonComponent } from "./button";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function AddContentModel({ open, onclose }) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleref.current?.value;
    const link = linkref.current?.value;
    if (title == "" || link == "") {
      return;
    }
    await axios.post(
      BACKEND_URL + "/api/v1/content",
      { title, link, type },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    onclose();
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500/80 fixed top-0 left-0 flex  justify-center">
          <div className="flex flex-col  justify-center w-1/4">
            <div className="bg-white/100 p-4 rounded">
              <div className="flex justify-end pb-2" onClick={onclose}>
                <Crossicon />
              </div>
              <div>
                <Input placeholder={"Title"} reference={titleref} />
                <Input placeholder={"Link"} reference={linkref} />
              </div>
              <div>
                <span>Type : </span>
                <div className="flex justify-center items-center text-center gap-2 mb-2">
                  <ButtonComponent
                    text={"Youtube"}
                    variant={
                      type == ContentType.Youtube ? "primary" : "secondary"
                    }
                    onclick={() => setType(ContentType.Youtube)}
                  />
                  <ButtonComponent
                    text={"Twitter"}
                    variant={
                      type == ContentType.Twitter ? "primary" : "secondary"
                    }
                    onclick={() => setType(ContentType.Twitter)}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={addContent}
                  className="bg-blue-500 px-4 py-2 mt-1 text-white rounded-md cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface inputprop {
  placeholder: String;
  reference?: any;
}

function Input({ placeholder, reference }: inputprop) {
  return (
    <div>
      <input
        type="text"
        className="px-4 py-2 rounded-sm border mb-3 border-gray-300 w-full "
        placeholder={placeholder}
        ref={reference}
      />
    </div>
  );
}
