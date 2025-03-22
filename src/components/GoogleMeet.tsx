"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";

const GoogleMeet = () => {
  const [meetingData, setMeetingData] = useState(null);
  const [scheduleedMeetingData, setScheduleedMeetingData] = useState(null);
  const [ldstate, setLoadingstate] = useState(false);

  const createMeeting = async (e) => {
    setLoadingstate(true);
    e.preventDefault();

    const response = await fetch("/api/google-meet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error("Failed to create meeting");
    }

    const data = await response.json();
    setMeetingData(data);
    setLoadingstate(false);
  };

  const gridData = [
    {
      id: 1,
      image: "/m1.jpg",
      title: "Meeting 1",
      gridSize: "row-span-3 col-span-1",
    },
    {
      id: 2,
      image: "/f1.jpg",
      title: "Meeting 2",
      gridSize: "row-span-2 col-span-1",
    },
    {
      id: 3,
      image: "/m2.jpg",
      title: "Meeting 3",
      gridSize: "row-span-4 col-span-1",
    },
    {
      id: 4,
      image: "/f2.jpg",
      title: "Meeting 4",
      gridSize: "row-span-3 col-span-1",
    },
    {
      id: 5,
      image: "/m3.jpg",
      title: "Meeting 5",
      gridSize: "row-span-2 col-span-1",
    },
    {
      id: 6,
      image: "/f3.jpg",
      title: "Meeting 6",
      gridSize: "row-span-2 col-span-1",
    },
    {
      id: 7,
      image: "/m4.jpg",
      title: "Meeting 7",
      gridSize: "row-span-3 col-span-1",
    },
    {
      id: 8,
      image: "/f4.jpg",
      title: "Meeting 8",
      gridSize: "row-span-2 col-span-1",
    },
    {
      id: 9,
      image: "/f5.jpg",
      title: "Meeting 9",
      gridSize: "row-span-2 col-span-1",
    },
  ];
  return (
    <div className=" flex flex-col gap-5 bg-yellow-100">
      <header className="flex justify-between items-center p-4 bg-gray-200 shadow-2xl h-auto">
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
      <div className=" w-full bg-[#00008B] border-4 border-orange-300 rounded-3xl py-3 px-10 max-w-[80vw] mx-auto">
        <header className=" flex justify-between items-center p-4 shadow-2xl h-auto">
          <p className=" text-white text-xl font-bold">BrunoCorp</p>
          <button>create meeting</button>
        </header>
        <div className=" flex gap-5 text-white">
          <div className=" w-1/2 flex justify-center items-start flex-col gap-5">
            <div className=" text-6xl font-bold">
              <p>Now video</p>
              <p>Conferencing</p>
              <p>
                is <span className=" text-orange-400">Easier</span> than
              </p>
              <p>ever</p>
            </div>
            <div>
              <button className="bg-[#00008B] text-white">
                <a
                  href="#create-meet-link"
                  
                  className="flex gap-2 justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Go to meeting
                </a>
              </button>
              <div></div>
            </div>
            <p>" This applications helps me to manage my meetings easily "</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-10 gap-3 w-1/2 min-h-[800px]">
            {gridData.map((item) => {
              const height = Number(
                +item.gridSize.split(" ")[0]?.split("-")[2]
              );
              return (
                <div
                  key={item.id}
                  className={`relative ${item.gridSize}`}
                  style={{
                    gridColumn: "auto/span 1",
                    gridRow: `auto/span ${height}`,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className=" rounded-lg shadow-md"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <p className=" text-2xl font-bold">GoogleMeet</p>
      <div className="grid grid-cols-2 ">
        <div className="flex flex-col gap-5">
          <p>Do Instant Meeting</p>
          <button
            onClick={async (e) => {
              createMeeting(e);
            }}
            className={`bg-blue-500 text-white px-4 py-2 rounded w-fit cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out flex gap-2 ${
              ldstate ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Start an instant Meeting
            {ldstate && <Spinner />}
          </button>

          {meetingData && (
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-bold">Meeting Details</h2>
              <p>Meeting ID: {meetingData.id}</p>
              <p>
                Meeting URL:{" "}
                <Link href={meetingData.hangoutLink}>
                  {meetingData.hangoutLink}
                </Link>
              </p>
            </div>
          )}
        </div>
        <div>
          <Dt
            setSchedule={setScheduleedMeetingData}
            scheduledMeetingData={scheduleedMeetingData}
          />
        </div>
      </div> */}

      {/* new ui */}

      <div
        id="create-meet-link"
        className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4"
      >
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Google Meet</h1>
          <p className="mt-2 text-gray-600">
            Start or schedule a video meeting effortlessly
          </p>
        </div>

        {/* Main Container */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Image src={"/video.png"} alt="video" width={30} height={30} />
                Instant Meeting
              </h2>
              <p className="text-gray-600">
                Create a meeting link and share it immediately.
              </p>
            </div>
            <button
              onClick={async (e) => {
                createMeeting(e);
              }}
              className="mt-6 flex gap-2 justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Start an Instant Meeting
              {ldstate && <Spinner />}
            </button>
            {meetingData && (
              <div className="mt-6 bg-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-700">Meeting Details</h3>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-semibold">Meeting ID:</span>{" "}
                  {meetingData.id}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-semibold">Start:</span>{" "}
                  {meetingData.start.dateTime}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">End:</span>{" "}
                  {meetingData.end.dateTime}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Meeting URL:</span>{" "}
                  <a
                    href={meetingData.hangoutLink}
                    className="text-blue-600 hover:underline break-all"
                  >
                    {meetingData.hangoutLink}
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Schedule Meeting Section */}
          <DtNew
            setSchedule={setScheduleedMeetingData}
            scheduledMeetingData={scheduleedMeetingData}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GoogleMeet;

function Dt({ setSchedule, scheduledMeetingData }) {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (new Date(endDateTime) <= new Date(selectedDateTime)) {
      toast.error("End date and time must be after start date and time.");
      setLoading(false);
      return;
    }
    const formData = {
      startdateTime: selectedDateTime,
      endDateTime: endDateTime,
    };

    const response = await fetch("/api/google-meet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create meeting");
    }

    const data = await response.json();
    console.log("Scheduled Meeting Data:", data);
    setSchedule(data);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex gap-10">
          <div>
            <h2>Select start Date & Time</h2>
            <input
              type="datetime-local"
              value={selectedDateTime}
              onChange={(e) => setSelectedDateTime(e.target.value)}
              required
            />
          </div>
          <div>
            <h2>Select end Date & Time</h2>
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              required
            />
          </div>
        </div>
        <br />
        <br />
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded w-fit cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out flex gap-2 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Schedule a meeting
          {loading && <Spinner />}
        </button>
      </form>

      {scheduledMeetingData && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold">Meeting Details</h2>
          <p>Meeting ID: {scheduledMeetingData.id}</p>
          <p>
            Meeting URL:{" "}
            <Link href={scheduledMeetingData.hangoutLink}>
              {scheduledMeetingData.hangoutLink}
            </Link>
          </p>
          {/* <p>Start Time: {scheduledMeetingData.start}</p>
          <p>Start Time: {scheduledMeetingData.end}</p> */}
        </div>
      )}
    </div>
  );
}

function DtNew({ setSchedule, scheduledMeetingData }) {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (new Date(endDateTime) <= new Date(selectedDateTime)) {
      toast.error("End date and time must be after start date and time.");
      setLoading(false);
      return;
    }
    const formData = {
      startdateTime: selectedDateTime,
      endDateTime: endDateTime,
    };

    const response = await fetch("/api/google-meet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create meeting");
    }

    const data = await response.json();
    console.log("Scheduled Meeting Data:", data);
    setSchedule(data);
    setLoading(false);
  };

  return (
    <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Image src={"/schedule.png"} alt="video" width={30} height={30} />
        Schedule a Meeting
      </h2>
      <p className="text-gray-600 mb-6">
        Plan a meeting for a future date and time.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          className={`mt-6 flex gap-2 justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Schedule a Meeting
          {loading && <Spinner />}
        </button>
      </form>
      {scheduledMeetingData && (
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="font-medium text-gray-700">Scheduled Meeting</h3>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold">Start:</span>{" "}
            {scheduledMeetingData.start.dateTime}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">End:</span>{" "}
            {scheduledMeetingData.end.dateTime}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-semibold">Meeting ID:</span>{" "}
            {scheduledMeetingData.id}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Meeting URL:</span>{" "}
            <a
              href={scheduledMeetingData.hangoutLink}
              className="text-blue-600 hover:underline break-all"
            >
              {scheduledMeetingData.hangoutLink}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
