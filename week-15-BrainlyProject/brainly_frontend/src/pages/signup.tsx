import { useRef } from "react";
import { ButtonComponent } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router";

export function Signup() {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();

  async function signup() {
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup", { username, password });
    navigate("/signin");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="min-w-48 px-8 py-5 bg-white rounded-lg border border-slate-200">
        <div className="mt-3">
          <Input placeholder={"username"} reference={usernameref} />
          <Input placeholder={"password"} reference={passwordref} />
        </div>

        <div className="flex justify-center items-center">
          <ButtonComponent
            variant="signup"
            text={"Sign Up"}
            loading={false}
            fullwidth={true}
            onclick={signup}
          />
        </div>
      </div>
    </div>
  );
}
