"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomDatePicker from "./ui/date-picker";
import CustomTimeField from "./ui/time-field";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const GoogleMeet = () => {
  const [meetingData, setMeetingData] = useState(null);
  const [mydate, setMyDate] = useState(new Date());
  // const [mytime, setMyTime] = useState(new Date().getHours());

  useEffect(() => {
    // console.log("mytime", mytime);
    console.log("mydate", mydate);
  }, []);

  const { control, handleSubmit, watch } = useForm({ mode: "onChange" });
  console.log("watch time", watch("date"));
  console.log("watch time", watch("time"));

  const createMeeting = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/google-meet", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create meeting");
    }

    const data = await response.json();
    console.log("Meeting Details:", data);
    setMeetingData(data);
    // return data;
  };

  const scheduledMeeting = async (formData) => {
    console.log("formData", formData);

    // const response = await fetch("/api/google-meet", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to create meeting");
    // }

    // const data = await response.json();
    // console.log("Meeting Details:", data);
    // setMeetingData(data);
  };

  const minDateValue = new Date(new Date().setDate(new Date().getDate()));

  return (
    <div className="pt-10 flex flex-col gap-5">
      <p>GoogleMeet</p>
      <p>Do Instant Meeting</p>
      <button
        onClick={async (e) => {
          createMeeting(e);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded w-fit cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        Start an instant Meeting
      </button>

      {meetingData && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold">Meeting Details</h2>
          <p>Meeting ID: {meetingData.id}</p>
          <p>Meeting URL: {meetingData.hangoutLink}</p>
        </div>
      )}

      {/* <form onSubmit={handleSubmit(scheduledMeeting)}>
        <section className="flex gap-8">
          <div className="w-max">
            <h2 className="font-semibold text-lg">
              Data Entry Start Date <span className="text-error">*</span>
            </h2>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  onChange={onChange}
                  value={value}
                  showLabel={false}
                  isDisabled={false}
                  minValue={minDateValue}
                  allowFutureDates
                />
              )}
            />
          </div>
          <div className="w-max">
            <h2 className="font-semibold text-lg">
              Billing Start Time <span className="text-error">*</span>
            </h2>
            <Controller
              control={control}
              name="time"
              render={({ field: { onChange, value } }) => (
                <CustomTimeField
                  onChange={onChange}
                  value={value || new Date()}
                  // isDisabled={false}
                  allowFutureTimes
                  hideLabel
                />
              )}
            />
          </div>
        </section>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-fit cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      </form> */}
      {/* <form className=" w-fit">
        <DateTime setMyDate={setMyDate} />
      </form> */}
      <Dt />
    </div>
  );
};

export default GoogleMeet;

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// function DateTime({ setMyDate }) {
//   const [value, onChange] = useState<Value>(new Date());
//   console.log("new value", value);
//   console.log("new onChange ", onChange);

//   return (
//     <DateTimePicker
//       onChange={(e) => setMyDate(e)}
//       value={value}
//       minDate={new Date()}
//     />
//   );
// }

function Dt() {
  const [selectedDateTime, setSelectedDateTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Selected Date & Time: ${selectedDateTime}`);

  };
  const scheduledMeeting = async (formData) => {
    console.log("formData", formData);

    // const response = await fetch("/api/google-meet", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to create meeting");
    // }

    // const data = await response.json();
    // console.log("Meeting Details:", data);
    // setMeetingData(data);
  };


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Select Date & Time</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={selectedDateTime}
          onChange={(e) => setSelectedDateTime(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>

      {selectedDateTime && (
        <p>
          Selected Date & Time: <strong>{selectedDateTime}</strong>
        </p>
      )}
    </div>
  );
}
