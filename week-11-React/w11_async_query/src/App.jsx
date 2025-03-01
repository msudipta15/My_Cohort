import { RecoilRoot, useRecoilValue } from "recoil";
import "./App.css";
import { notifications, totalselector } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const values = useRecoilValue(notifications);
  const total = useRecoilValue(totalselector);
  return (
    <>
      <button>Network ({values.network})</button>
      <button>Jobs ({values.jobs})</button>
      <button>Notification ({values.notifications})</button>
      <button>Message({values.messaging})</button>
      <button>Me ({total})</button>
    </>
  );
}

export default App;
