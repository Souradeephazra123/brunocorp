import GoogleMeet from "@/components/GoogleMeet";
import Logout from "@/components/Logout";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface SessionDetails {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

const page = async () => {
  const serverSideSession: SessionDetails = await getServerSession();

  if(!serverSideSession?.user) {
    redirect("/");
  }


  return (
    <div className=" ">
      {/* <div className="flex justify-between items-start">
        <div className=" flex flex-col gap-2">
          <p>Name: {serverSideSession?.user?.name}</p>
          <p>Email: {serverSideSession?.user?.email}</p>
          <Image
            src={serverSideSession?.user?.image}
            width={100}
            height={100}
            className=" rounded-full"
            alt="Profile Picture"
          />
        </div>
        <Logout />
      </div> */}
      <GoogleMeet/>
    </div>
  );
};

export default page;
