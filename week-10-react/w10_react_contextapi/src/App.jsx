import { createContext, useContext, useState } from "react";

const BulbContext = createContext();
const CounterContext = createContext();

function CounterProvider({ children }) {
  const [count, setcount] = useState(0);
  return (
    <CounterContext.Provider value={{ count: count, setcount: setcount }}>
      {children}
    </CounterContext.Provider>
  );
}

function BulbProvider({ children }) {
  const [bulbon, setbulbon] = useState(true);
  return (
    <BulbContext.Provider value={{ bulbon: bulbon, setbulbon: setbulbon }}>
      {children}
    </BulbContext.Provider>
  );
}

function App() {
  return (
    <div>
      <div>
        <BulbProvider>
          <Light />
        </BulbProvider>
      </div>
      <br />
      <br />
      <div>
        <CounterProvider>
          <IncreaseCounter />
          <DecreaseCounter />
          <Counter />
        </CounterProvider>
      </div>
    </div>
  );

  function IncreaseCounter() {
    const { setcount, count } = useContext(CounterContext);
    return <button onClick={() => setcount(count + 1)}>Increase</button>;
  }
  function DecreaseCounter() {
    const { setcount, count } = useContext(CounterContext);
    return <button onClick={() => setcount(count - 1)}>Decrease</button>;
  }

  function Counter() {
    const { count } = useContext(CounterContext);
    return <div>{count}</div>;
  }

  function Light() {
    return (
      <div>
        <LightBulb />
        <LightSwitch />
      </div>
    );
  }

  function LightBulb() {
    const { bulbon } = useContext(BulbContext);
    return <div>{bulbon ? "Bulb On" : "Bulb Off"}</div>;
  }

  function LightSwitch() {
    const { setbulbon } = useContext(BulbContext);
    function toggle() {
      setbulbon((c) => !c);
    }
    return (
      <div>
        <button onClick={toggle}>Toggle Bulb</button>
      </div>
    );
  }
}

export default App;
