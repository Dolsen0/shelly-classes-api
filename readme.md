# Backend Setup Guide

## Prerequisites
Ensure you have Node.js version 20 installed on your system. If you are using NVM (Node Version Manager), you can switch to Node.js version 20 by running:

If you do not have Node.js version 20 installed, you can install it using NVM:

"nvm use 20"

If you do not have Node.js version 20 installed, you can install it using NVM:

"nvm install 20"

**Navigate to the backend directory** where the project is located:

**Install dependencies** by running:
"npm i"

## Configuration
Create a `.env` file in the root of the backend project and populate it with the necessary environment variables. Here is the list of required environment variables:
- `FTP_HOST`: The hostname of the FTP server.
- `FTP_USER`: Your FTP username.
- `FTP_PASSWORD`: Your FTP password.
- `PORT`: FTP port number.

To start the server locally and test if everything is set up correctly, run:
"npm run start"

This command will initiate the server on `http://localhost:8080`,
