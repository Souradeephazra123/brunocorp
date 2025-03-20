import { SpacesServiceClient } from "@google-apps/meet";
import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
// import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req: NextRequest) {
  try {
    const { startdateTime, endDateTime } = await req.json();

    const headers = req.headers;
    const session = await getServerSession(authOptions);

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
        console.log("Token Refreshed");

        //Update next-auth session

        session.accessToken = oauth2Client.credentials?.access_token;
        session.refreshToken = oauth2Client.credentials?.refresh_token;
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        return NextResponse.json(
          { error: "Failed to refresh access token" },
          { status: 401 }
        );
      }
    }

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client, // OAuth2 Token
    });

    // Create a Google Meet Event
    const event = {
      summary: "Google Meet Meeting",
      description: "Auto-generated Google Meet link",
      start: {
        dateTime: startdateTime
          ? new Date(
              new Date(startdateTime).getTime() + 60 * 60 * 1000
            ).toISOString()
          : new Date().toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime
          ? new Date(
              new Date(endDateTime).getTime() + 60 * 60 * 1000
            ).toISOString()
          : new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: { requestId: new Date().getTime().toString() },
      },
    };

    if (endDateTime) {
      event.end = {
        dateTime: new Date(
          new Date(endDateTime).getTime() + 60 * 60 * 1000
        ).toISOString(),
        timeZone: "Asia/Kolkata",
      };
    }

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });

    return Response.json(response.data);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
