import { useRef } from "react";
import { ButtonComponent } from "../components/button";
import { Input } from "../components/input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameref.current?.value;
    const password = passwordref.current?.value;

    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    console.log(response);

    console.log(`token: ${token}`);

    navigate("/dashboard");
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
            text={"Sign in"}
            loading={false}
            fullwidth={true}
            onclick={signin}
          />
        </div>
      </div>
    </div>
  );
}
