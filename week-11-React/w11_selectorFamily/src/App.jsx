import {
  RecoilRoot,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import "./App.css";
import { todoatomFamily } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  const todo = useRecoilValueLoadable(todoatomFamily(id));

  // if u need states then use useStateValueLoadable

  // Use useRecoilStateLoadable for async requests so that it can
  // show loading while fetching the backend data
  // BY using this useRecoilStateLoadable , todo now contains an object

  if (todo.state === "loading") {
    return <>Loading.....</>;
  } else if (todo.state === "hasValue") {
    return <>{todo.contents.title}</>;
  }
}

export default App;
