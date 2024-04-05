import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

import { fileURLToPath } from "url";
import { parseStringPromise } from "xml2js"; // Import the parseStringPromise function from xml2js

const app = express();
const PORT = 8080;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/classes", async (req, res) => {
  try {
    const xmlFilePath = path.join(__dirname, "classdata.xml");
    const content = await fs.promises.readFile(xmlFilePath, "utf8");
    const result = await parseStringPromise(content);
    res.json(result);
  } catch (error) {
    console.error("Failed to read or convert the XML file:", error);
    res.status(500).json("Failed to read or convert the XML file.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
