import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div>
      <div style={{ display: "flex", backgroundColor: "grey" }}>
        <Card>
          <div style={{ color: "red" }}>
            What do you want to post
            <br />
            <br />
            <input type="text" placeholder="input.." />
          </div>
        </Card>
        <Card>Hi there</Card>
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        color: "black",
        margin: 10,
        padding: 10,
      }}
    >
      {children}
    </div>
  );
}

export default App;
