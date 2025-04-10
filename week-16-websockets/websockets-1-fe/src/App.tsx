import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const message = useRef<HTMLInputElement>(null);
  const [connection, setConnection] = useState<any>();

  function sendmessage() {
    const input = message.current?.value;
    connection.send(input);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setConnection(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <div>
      <input type="text" ref={message} />
      <button onClick={sendmessage}>ping</button>
    </div>
  );
}

export default App;
