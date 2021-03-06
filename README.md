# bug-stalker

Bug Tracking System

## Getting Started

Bug Stalker App is a tool to help a Development Team to list and track bugs.

### Tech Used

MongoDB, Express, Angular, Node.js, Auth0  

### Prerequisites

1. Create `.env` file on the `server` root folder and add the following variables.
```
  MONGODB_ATLAS=<MONGODOB_ATLAS_STRING>
  MONGODB_LOCAL=<MONGODB_LOCAL_STRING>

  AUTH0_DOMAIN=<AUTH0_DOMAIN>
  AUTH0_CLIENT_ID=<AUTH0_CLIENT_ID>
  AUTH0_CLIENT_SECRET=<AUTH0_CLIENT_SECRET>
  AUTH0_API_AUDIENCE=<AUTH0_API_AUDIENCE>

  PUSHER_APP_ID=<PUSHER_APP_ID>
  PUSHER_APP_KEY=<PUSHER_APP_KEY>
  PUSHER_APP_SECRET=<PUSHER_APP_SECRET>
  PUSHER_APP_CLUSTER=<PUSHER_APP_CLUSTER>
  PUSHER_APP_SECURE=1
```

### Running the App

`cd` to `server` and run the command
```
npm install
...
npm run server
```

Now, the app should be running. Enjoy!

## Author
**Clark Egbert Alinsob**


