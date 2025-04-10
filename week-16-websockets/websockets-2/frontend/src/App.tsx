import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState(["hi there", "hello"]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      setMessage((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomID: "red",
          },
        })
      );
    };
  }, []);

  return (
    <div className="h-screen bg-slate-500">
      <div className="  h-[90vh] bg-slate-800">
        {message.map((message) => (
          <div className="m-8">
            <span className="bg-white text-black rounded p-4">{message}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          className="bg-white px-10 py-3 rounded-md m-2 "
          placeholder="message.."
          ref={inputRef}
        />
        <button
          className="px-2 mt-2 mb-2 rounded-md  bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
          onClick={() => {
            wsRef.current?.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: inputRef.current?.value,
                },
              })
            );
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
