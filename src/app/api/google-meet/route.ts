import { SpacesServiceClient } from "@google-apps/meet";
import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
// import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
export async function GET(req: NextRequest) {
  try {
    // const auth = new GoogleAuth({
    //   credentials: {
    //     client_email: process.env.GOOGLE_CLIENT_EMAIL,
    //     private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    //   },
    //   scopes: ["https://www.googleapis.com/auth/meetings.space.created"],
    // });

    // const client = await auth.getClient();

    // const meetingDetails = await createMeeting();
    // console.log("Meeting Details:", meetingDetails);
    // if (error) {
    //   return new Response(JSON.stringify({ error }), { status: 400 });
    // }

    // if (!code || !state) {
    //   return new Response("Missing code or state", { status: 400 });
    // }

    // Handle the OAuth2 flow here
    // For example, exchange the code for tokens

    const headers = req.headers;
    const session = await getServerSession(authOptions);

    console.log("Session:", session);

    // if (!session || !session.accessToken) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // const oauth2Client = new google.auth.OAuth2();
    // oauth2Client.setCredentials({ access_token: session.accessToken });


 // **Refreshed Access Token Handling (Important!)**
 const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
    access_token: session.accessToken as string,
    refresh_token: session.refreshToken as string, // Use refresh token!
});


// Refresh the access token if necessary
if (oauth2Client.isTokenExpiring()) {

  try {
      await oauth2Client.refreshAccessToken();
      console.log('Token Refreshed');

      //Update next-auth session

      session.accessToken = oauth2Client.credentials?.access_token;
      session.refreshToken = oauth2Client.credentials?.refresh_token;

  } catch (refreshError) {
    console.error('Failed to refresh access token:', refreshError);
    return NextResponse.json({ error: "Failed to refresh access token" }, { status: 401 });
  }
}




    console.log("OAuth2 Client:", oauth2Client);

    console.log("Access Token:", session.accessToken);
    // const calendar = google.calendar({
    //   version: "v3",
    //   auth: session?.accessToken, // OAuth2 Token
    // });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client, // OAuth2 Token
    });
    console.log("Calendar Client:", calendar);

    // Create a Google Meet Event
    const event = {
      summary: "Google Meet Meeting",
      description: "Auto-generated Google Meet link",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: { requestId: new Date().getTime().toString() },
      },
    };

    console.log("Event Data:", event);

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });
    console.log("Event Response:", response.data);
    const meetingLink = response.data.hangoutLink;
    console.log("Meeting Link:", meetingLink);
    const meetingId = response.data.id;
    console.log("Meeting ID:", meetingId);
    const meetingUrl = response.data.htmlLink;
    console.log("Meeting URL:", meetingUrl);
    const meetingData = {
      meetingLink,
      meetingId,
      meetingUrl,
    };
    console.log("Meeting Data:", meetingData);

    return Response.json(response.data);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function createMeeting() {
  const meetClient = new SpacesServiceClient({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MEET_API_KEY,
    projectId: process.env.NEXT_PUBLIC_GOOGLE_MEET_PROJECT_ID,
  });

  try {
    const request = {};
    const meeting = await meetClient.createSpace(request);
    console.log("Meeting created:", meeting);
    return meeting;
  } catch (e) {
    console.log("Error creating meeting:", e);
    throw new Error("Failed to create meeting", e);
  }
}
