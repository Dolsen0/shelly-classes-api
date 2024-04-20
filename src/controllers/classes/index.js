import fs from "fs";
import path from "path";
import GetFileFtp from "../../services/ftp/index.js";
import { fileURLToPath } from "url";
import { parseStringPromise } from "xml2js";

export async function getClasses(req, res) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log(__dirname)
  try {
    const xmlFilePath = path.join(__dirname, "../../../classdata.xml");
    const content = await fs.promises.readFile(xmlFilePath, "utf8");
    const result = await parseStringPromise(content);
    GetFileFtp();
    res.json(result);
  } catch (error) {
    console.error("Failed to read or convert the XML file:", error);
    res.status(500).json("Failed to read or convert the XML file.");
  }
}
