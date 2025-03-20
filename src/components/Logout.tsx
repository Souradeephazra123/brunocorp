"use client";
import React from "react";
import { signOut } from "next-auth/react";
const Logout = () => {
  const handleSignOut = async (event) => {
    event.preventDefault();
    await signOut({callbackUrl: "/"});
 
  };
  return (
    <form onSubmit={handleSignOut} className="flex flex-col gap-4 w-fit">
      <button
        type="submit"
        name="GoogleSignOut"
        value="google"
        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Logout
      </button>
    </form>
  );
};

export default Logout;
