import { SpacesServiceClient } from "@google-apps/meet";
import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

export async function GET() {
  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/meetings.space.created"],
    });

    const client = await auth.getClient();

    const meetingDetails = await createMeeting();
    console.log("Meeting Details:", meetingDetails);
    // if (error) {
    //   return new Response(JSON.stringify({ error }), { status: 400 });
    // }

    // if (!code || !state) {
    //   return new Response("Missing code or state", { status: 400 });
    // }

    // Handle the OAuth2 flow here
    // For example, exchange the code for tokens

    return Response.json(meetingDetails);
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
