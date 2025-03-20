"use client";
import { signIn } from "next-auth/react";
import React from "react";

const HomePage = () => {
  const handleSignIn = async (event) => {
    event.preventDefault();
    const actions = event.target.GoogleSignIn.value;
    console.log(actions);
    await signIn(actions, {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className=" flex items-center justify-center h-screen flex-col bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
      <p>Time to Login</p>
      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
        <button
          type="submit"
          name="GoogleSignIn"
          value="google"
          className=" bg-blue-400 rounded-lg p-2 cursor-pointer"
        >
          Sign In with Google
        </button>
      </form>
    </div>
  );
};

export default HomePage;
