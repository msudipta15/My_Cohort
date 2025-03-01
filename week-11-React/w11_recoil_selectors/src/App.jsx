import "./App.css";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { messageAtom, topbarAtom, totalSelector } from "./atom";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const values = useRecoilValue(topbarAtom);
  console.log(values);
  const notication_count = values.notification;
  const jobs_count = values.jobs;
  const [messagecount, setmessagecount] = useRecoilState(messageAtom);
  const total = useRecoilValue(totalSelector);
  return (
    <>
      <button>Home</button>
      <button>Notification ({notication_count})</button>
      <button>Jobs ({jobs_count})</button>
      <button>Messages ({messagecount})</button>
      <button
        onClick={() => {
          setmessagecount(messagecount + 1);
        }}
      >
        Me
      </button>
      <button>Total ({total})</button>
    </>
  );
}

export default App;
