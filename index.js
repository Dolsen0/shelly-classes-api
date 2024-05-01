import 'dotenv/config';
import express from "express";
import cors from "cors";
import cron from "node-cron";

import {GetFileFtp, GetImagesFtp} from "./src/services/ftp/index.js";
import { getClasses } from "./src/controllers/classes/index.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static('public'));

app.use(cors());  

// app.use(cors({
//   origin: ['https://dev-shelly-university.ue.r.appspot.com', 'http://localhost:3000'] // Used for development- Add the URL of the frontend application
// }));


// Retrieves and displays classdata.xml file in JSON format
app.get("/api/classes", getClasses);


/*      Cron Job

Schedule cron job to run every day at 6:00 UTC / 2:00 AM Eastern Time
This will download the classdata.xml file and images from the FTP server

*/

cron.schedule(
  "0 6 * * *",
  () => {
    GetImagesFtp();
    GetFileFtp();
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);
cron.schedule(
  "21 14 * * *",
  () => {
    GetImagesFtp();
    GetFileFtp();
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (error) => {
    console.error("Error occurred starting the server: ", error);
  });
