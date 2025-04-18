"use client";

import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div
        className=" h-1/3 w-1/4 p-8
      "
      >
        <div className="flex justify-center items-center m-2">
          <p>Username</p>

          <input
            type="text"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            className="bg-white text-black  m-2 mb-5 ml-3 p-1 rounded-md w-64 "
          />
        </div>

        <div className="flex justify-center items-center m-2">
          <p>Password</p>

          <input
            type="text"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="bg-white text-black m-2 mb-5 ml-3.5 p-1 rounded-md w-64 "
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            className="bg-blue-600 px-4 py-1 rounded-md m-2 cursor-pointer"
            onClick={() => {
              axios.post("http://localhost:3000/api/signup", {
                username,
                password,
              });
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
