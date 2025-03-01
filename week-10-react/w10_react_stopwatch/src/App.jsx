import { useRef, useState } from "react";

function App() {
  const [count, setcount] = useState(1);
  const timer = useRef();
  function startclock() {
    let value = setInterval(() => {
      setcount((c) => c + 1);
    }, 1000);

    timer.current = value;
  }

  function stopclock() {
    clearInterval(timer.current);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{count}</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={startclock}>Start</button>
        <button onClick={stopclock}>Stop</button>
      </div>
    </div>
  );
}

export default App;
