import React from "react";
import "./App.css";
import { atom, RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

const counterAtom = atom({
  default: 0,
  key: "counter",
});

function App() {
  return (
    <RecoilRoot>
      <div>
        <CurrentCount />
        <Buttons />
      </div>
    </RecoilRoot>
  );
}

function CurrentCount() {
  const count = useRecoilValue(counterAtom);
  return <div>{count}</div>;
}

function Buttons() {
  const setCount = useSetRecoilState(counterAtom);

  function increase() {
    setCount((c) => c + 1);
  }
  function decrease() {
    setCount((c) => c - 1);
  }

  return (
    <div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
}

export default App;
