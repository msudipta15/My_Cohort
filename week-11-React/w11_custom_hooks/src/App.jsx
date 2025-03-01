import { useEffect, useState } from "react";

import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { usePrev } from "./hooks/use-prev";
import { useDebounce } from "./hooks/useDebounce";

// we created a custom hook useCounter that returns count and increasecount
function useCounter() {
  const [count, setcount] = useState(0);

  function increasecount() {
    setcount(count + 1);
  }
  return {
    count: count,
    increasecount: increasecount,
  };
}

function App() {
  const [currentPost, setcurrentPost] = useState(1);
  const { count, increasecount } = useCounter();
  const [state, setstate] = useState(0);
  const prev = usePrev(state);
  const { response, loading } = useFetch(
    "https://jsonplaceholder.org/posts/" + currentPost
  );
  const [inputval, setInputVal] = useState("");
  const debouncedvalue = useDebounce(inputval, 200);

  function change(e) {
    setInputVal(e.target.value);
  }
  useEffect(() => {
    console.log("Expensive Operations !");
  }, [debouncedvalue]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h3>custom Hook - useCounter</h3>
      <p>
        <button onClick={increasecount}>Increase {count}</button>
      </p>

      <h3>custom hook - useFetch</h3>
      <button onClick={() => setcurrentPost(1)}>1</button>
      <button onClick={() => setcurrentPost(2)}>2</button>
      <button onClick={() => setcurrentPost(3)}>3</button>
      <p>Content: {response.title}</p>

      <h3>custom hook - usePrev</h3>
      <p>{state}</p>
      <button onClick={() => setstate((c) => c + 1)}>Increase</button>
      <p>Previous State: {prev}</p>

      <h3>custom hook - useDebounce</h3>
      <input type="text" onChange={change}></input>
      <p>
        If you type very fast heavy operation will not be done. Heavy operations
        will be done on every 30ms. Check the console !
      </p>
    </div>
  );
}

export default App;
