import 'dotenv/config';
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import cron from "node-cron";
import adminRoutes from './src/routes/adminRoutes.js';

import { fileURLToPath } from "url";
import { parseStringPromise } from "xml2js";

import {GetFileFtp, GetImagesFtp} from "./src/services/ftp/index.js";
import { adminLogin, adminRegister } from "./src/controllers/adminAuth/index.js";
import { getClasses } from "./src/controllers/classes/index.js";



const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static('public'));

const corsOptions = {
  origin: [
    "https://dev-shelly-university.ue.r.appspot.com",
    "http://localhost:3000",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Retrieves and displays classdata.xml file in JSON format
app.get("/api/classes", getClasses);

// Admin Auth Routes
app.get("/api/login", (req, res) => {
  res.send("This is the login page");
});

app.post("/api/login", adminLogin);

// Admin CRUD Routes

app.use('/api/admin', adminRoutes);


/*      Cron Job

Schedule cron job to run every day at 6:00 UTC / 2:00 AM Eastern Time
This will download the classdata.xml file from the FTP server

Cron job will not work in google app engine as it is a serverless environment ( dev-shelly-university.ue.r.appspot.com )
It will work on a dedicated server

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
  "52 14 * * *",
  () => {
    GetImagesFtp();
    GetFileFtp();
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);


app.get("/api/getFileFTP", async (req, res) => {
  try {
    await GetFileFtp();
    res.send("File downloaded successfully");
  } catch (error) {
    res.status(500).send("Failed to download file");
  }
}
);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (error) => {
    console.error("Error occurred starting the server: ", error);
  });
