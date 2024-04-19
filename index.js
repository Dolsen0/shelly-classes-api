import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

import { fileURLToPath } from "url";
import { parseStringPromise } from "xml2js";

import GetFileFtp from "./src/services/ftp/index.js";
import { adminLogin } from "./src/controllers/adminAuth/index.js";
import { getClasses } from "./src/controllers/classes/index.js";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));



const corsOptions = {
  origin: ['https://dev-shelly-university.ue.r.appspot.com', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// Fetches classdata.xml file from FTP server
// GetFileFtp();

// Retrieves and displays classdata.xml file in JSON format
app.get("/api/classes", getClasses);


// Admin Auth Routes
app.get("/api/login", (req, res) => {
  res.send("This is the login page");
});

app.post("/api/login", adminLogin);


// Admin CRUD Routes

app.get("/api/admin", (req, res) => {
  res.send("This is the admin page");
});

app.post("/api/admin", (req, res) => {
  res.send("ok");
});

app.patch("/api/admin", (req, res) => {
  res.send("This is the admin page");
});

app.delete("/api/admin", (req, res) => {
  res.send("This is the admin page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Error occurred starting the server: ', error);
});
