"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";

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
    <div className=" flex gap-10 h-screen flex-col  ">
      <header className="flex justify-between items-center p-4 bg-gray-200 shadow-2xl h-auto">
        {/* <p className=" text-2xl font-bold ">BrunoCorp</p> */}
        <h1
          style={{
            background:
              "linear-gradient(10.77deg, #F9FE11 3.31%, #FF9A3D 67.02%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          className={`  flex items-start text-5xl leading-6 sm:leading-[48px]  2xl:leading-[72px]  sm:text-5xl 2xl:text-9xl  z-[5] h-auto `}
        >
          BrunoCorp
        </h1>
      </header>
      <div className=" flex gap-10 p-10">
        <div className=" w-1/2 flex flex-col gap-5">
          <div>
            <div className=" text-6xl font-bold ">
              <p className="text-[#0C0950]">Easy</p>{" "}
              <p className="text-[#0C0950]">scheduling</p>{" "}
              <p className="text-[#261FB3]">ahead</p>
            </div>
          </div>
          <h1 className="text-xl text-gray-400">
            Brunocorp help you scheduling your meetings <br />
            Connect instantly with secure and free video conferencing.
          </h1>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <button
              type="submit"
              name="GoogleSignIn"
              value="google"
              className=" cursor-pointer flex gap-2 2xl:gap-4 items-center justify-center py-1 2xl:py-3 rounded-md bg-[#F8F8F9] shadow-custom border-2 border-gray-300 hover:shadow-lg transition-all duration-200 ease-in-out w-fit p-2"
            >
              <Image
                unoptimized={true}
                src={"/Google.svg"}
                width={25}
                height={25}
                alt="Google"
                className=" bg-transparent w-[1rem] 2xl:w-[1.52rem] h-[1rem] 2xl:h-[1.52rem]"
              />{" "}
              <span>Continue with Google</span>
            </button>
          </form>
        </div>
        <div className=" w-1/2 relative ">
          <div className=" absolute right-1/2 top-1/2 transform translate-x-1/2 translate-y-[-50%]">
            <Image
              unoptimized={true}
              src={"/wm2.jpg"}
              width={300}
              height={500}
              alt="woman"
              className=" w-[250px] bg-transparent h-[400px] object-cover z-0"
            />
          </div>
          <div className="absolute top-0 left-0 z-50 ">
            <Image
              src={"/male.jpg"}
              width={60}
              height={60}
              className="  rounded-full w-[60px] h-[60px] object-cover object-right"
              alt="male"
            />
            <div className=" relative -top-[55px] -right-[45px] blank w-3 h-3 bg-green-400 rounded-full"></div>
            <div className=" shadow-md p-2 relative left-20 -top-20 bg-white rounded-md">
              <div className="flex gap-2 items-center">
                Let's find a time to connect
                <div className=" blank w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
              <p className=" text-sm text-blue-400 font-bold">Meet now</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-50 ">
            <Image
              src={"/female.jpg"}
              width={60}
              height={60}
              className="  rounded-full w-[60px] h-[60px] object-cover object-right"
              alt="female"
            />
            <div className=" relative -top-[55px] -right-[45px] blank w-3 h-3 bg-green-400 rounded-full"></div>
            <div className=" shadow-md p-2 relative left-20 -top-20 bg-white rounded-md">
              <div className="flex gap-2 items-center">
                Looking forward to it
                <div className=" blank w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
              <p className=" text-sm text-blue-400 font-bold flex gap-2">
                {" "}
                <TiTick color="#261FB3" size={24} />
                <span> Meeting confirmed</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
