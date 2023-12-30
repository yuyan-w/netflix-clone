"use client";

import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { registerUser } from "./actions";

type LoginRegister = "login" | "register";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<LoginRegister>("login");

  const toggleVariant = () => {
    setVariant((p) => (p === "login" ? "register" : "login"));
  };

  const handleBtnClick = async () => {
    if (variant === "login") {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
      return;
    }

    await registerUser({ name, email, password });
    toggleVariant();
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  id="name"
                />
              )}
              <Input
                label="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
                id="email"
              />
              <Input
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                type="password"
                value={password}
                id="password"
              />
            </div>
            <button
              onClick={handleBtnClick}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}

              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
