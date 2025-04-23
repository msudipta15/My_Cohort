"use client";

import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div
      style={{
        background: "black",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextInput placeholder="room name" size="big" />
        <button
          onClick={() => {
            router.push("/chat/123");
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
