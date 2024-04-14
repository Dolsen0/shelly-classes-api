import { Client } from "basic-ftp";
import "dotenv/config";

export default async function GetFileFtp() {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: process.env.FTP_PORT,
      secure: false,
    });

    await client.cd("shelly_university");
    const localPath = "./classdata.xml";
    await client.downloadTo(localPath, "classdata.xml");
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    client.close();
  }
}