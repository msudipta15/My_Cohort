import axios from "axios";
import { Deleteicon } from "../icons/deleteicon";
import { Shareicon } from "../icons/shareicon";
import { TwitterSmall } from "../icons/twittersmall";
import { YoutubeSmall } from "../icons/yutubesmall";
import { youtubelink } from "./utils";
import { BACKEND_URL } from "../config";

interface cardprops {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentid: any;
}

export function CardComponent({ title, link, type, contentid }: cardprops) {
  async function deleteCard() {
    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      data: { contentid },
      headers: { token: localStorage.getItem("token") },
    });
  }

  return (
    <div className="bg-white p-4 max-w-72  min-h-96 min-w-64  rounded-md border border-gray-300 outline-slate-300 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div>
            {type == "twitter" && <TwitterSmall />}
            {type == "youtube" && <YoutubeSmall />}
          </div>
          <div className="text-md">{title}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <a href={link} target="_blank">
              <Shareicon />
            </a>
          </div>
          <div onClick={deleteCard}>
            <Deleteicon />
          </div>
        </div>
      </div>
      <div className="pt-4">
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x", "twitter")}></a>
          </blockquote>
        )}
        {type === "youtube" && (
          <iframe
            className="w-full pt-4"
            width="560"
            height="230"
            src={youtubelink(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
