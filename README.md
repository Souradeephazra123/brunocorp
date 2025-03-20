# Google Meet Scheduler

This application allows users to schedule Google Meet meetings. Users can create instant meetings or schedule meetings for a specific date and time.

## Features

- Create instant Google Meet meetings
- Schedule Google Meet meetings with a start and end time
- View meeting details including meeting ID and URL

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google API credentials (Client ID and Client Secret)

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/yourusername/google-meet-scheduler.git
cd google-meet-scheduler
```

Install Dependencies
```sh
npm install
```

Set Up Environment Variables
Create a .env file in the root directory and add the following environment variables:
```sh
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_aecret
AUTH_SECRET=yourOauth_secret
```

Run the Application
```sh
npm run dev
```

Open your browser and navigate to http://localhost:3000 to view the application.


## Usage
Instant Meeting: Click on the "Start an instant Meeting" button to create an instant Google Meet meeting.
Scheduled Meeting: Select the start date and time, and the end date and time, then click on the "Schedule a meeting" button to create a scheduled Google Meet meeting.
View Meeting Details: After creating a meeting, the meeting details including the meeting ID and URL will be displayed.