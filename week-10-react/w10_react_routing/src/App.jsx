import { useRef } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
  useHref,
} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/neet/class11" element={<Class11content />} />
            <Route path="/" element={<Landin />} />
            <Route path="/neet/class12" element={<Class12content />} />
            <Route path="*" element={<Errorpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Header() {
  return (
    <div style={{ backgroundColor: "grey" }}>
      <Link to="/">Allen</Link>|<Link to="/neet/class11">Class 11</Link>|
      <Link to="/neet/class12">Class 12</Link>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ backgroundColor: "grey" }}>Contact: allen@gmail.com</div>
  );
}

function Layout() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div style={{ height: "90vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function Landin() {
  // useHref Hook
  const inputRef = useRef();

  function focusOnInput() {
    inputRef.current.focus();
  }
  return (
    <div>
      welcome to Allen
      <div>
        Sign Up
        <input ref={inputRef} type="text" />
        <input type="text" />
        <button onClick={focusOnInput}>Submit</button>
      </div>
    </div>
  );
}
function Errorpage() {
  return <div>Sorry Page can not be found</div>;
}

function Class11content() {
  return (
    <div>
      <div>Welcome to Neet Class 11 course</div>
    </div>
  );
}

function Class12content() {
  const navigate = useNavigate();

  function redirectuser() {
    navigate("/");
  }

  return (
    <div>
      Welcome to Neet Class 12 courese
      <button onClick={redirectuser}>Go back to landing page</button>
    </div>
  );
}

export default App;
