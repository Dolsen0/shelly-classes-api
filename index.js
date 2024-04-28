import 'dotenv/config';
import express from "express";
import path from "path";
import cors from "cors";
import cron from "node-cron";

import { fileURLToPath } from "url";

import {GetFileFtp, GetImagesFtp} from "./src/services/ftp/index.js";
import { getClasses } from "./src/controllers/classes/index.js";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static('public'));


app.use(cors());

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
  "05 20 * * *",
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
