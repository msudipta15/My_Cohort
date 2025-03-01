import { useEffect, useState } from "react";

function App() {
  const [count1, setCount1] = useState(0);

  function decreasecount1() {
    setCount1((currentvalue) => currentvalue - 1);
  }
  // we can't do count1 - 1 because useState(0) hard codes the value of count1 to 0
  // So use function to get the currentvalue

  useState(() => {
    setInterval(decreasecount1, 1000);
  });

  const [count2, setCount2] = useState(0);
  function increasecount2() {
    setCount2((currentvalue) => currentvalue + 1);
  }
  useEffect(() => {
    setInterval(increasecount2, 1000);
  }, []);

  // [] is dependency array. By default if it is empty it will only render once in the start
  // [] by putting values here, we can tell react to re render

  const [currentTab, setcurrentTab] = useState("feed");

  useEffect(() => {
    console.log("send request to get data for " + currentTab + " tab");
  }, [currentTab]);

  // whenever currentTab value changes react will re render this

  const [showtimer, setshowtimer] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setshowtimer((current) => !current);
    }, 5000);
  }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => setcurrentTab("feed")}
          style={{ color: currentTab == "feed" ? "red" : "black" }}
        >
          Feed
        </button>
        <button
          onClick={() => setcurrentTab("notification")}
          style={{ color: currentTab == "notification" ? "red" : "black" }}
        >
          Notification
        </button>
        <button
          onClick={() => setcurrentTab("message")}
          style={{ color: currentTab == "message" ? "red" : "black" }}
        >
          messages
        </button>
        <button
          onClick={() => setcurrentTab("job")}
          style={{ color: currentTab == "job" ? "red" : "black" }}
        >
          jobs
        </button>
      </div>
      <div>
        <h3>{count1}</h3>
        <h3>{count2}</h3>
      </div>
      <div>{showtimer && <Timer />}</div>
    </div>
  );
}

const Timer = () => {
  const [seconds, setseconds] = useState(0);

  useEffect(() => {
    let clock = setInterval(() => {
      console.log("form inside the clock");

      setseconds((current) => current + 1);
    }, 1000);

    // without cleanup function the clock will be still running on backgrounds
    // to stop that we need cleanup function
    // this function will run when the above logic will unmount
    // cleanup function

    return function () {
      clearInterval(clock);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h3>
        {seconds} seconds has passed, i will be gone in 5th second and comeback
        after 5 seconds !
      </h3>
    </div>
  );
};

export default App;
