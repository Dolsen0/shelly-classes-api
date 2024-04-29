import { Client } from "basic-ftp";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_PORT } = process.env;

const ftpConfig = {
  host: FTP_HOST,
  user: FTP_USER,
  password: FTP_PASSWORD,
  port: FTP_PORT,
  secure: false,
};

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
);

const localImagesPath = path.join(projectRoot, "public", "images"); // Define localImagesPath here

export async function GetFileFtp() {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access(ftpConfig);

    await client.cd("shelly_university/data");
    const localPath = "./classdata.xml";
    await client.downloadTo(localPath, "classdata.xml");
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

export async function GetImagesFtp() {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access(ftpConfig);

    await client.cd("shelly_university/data/images");
    const files = await client.list();
    for (const file of files) {
      const localPath = path.join(localImagesPath, file.name);
      await client.downloadTo(localPath, file.name);
    }
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}