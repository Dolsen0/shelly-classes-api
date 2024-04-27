import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersDirectory = path.join(__dirname, '../../../', 'users');
const saltRounds = 10;

// Admin Auth Routes

export async function adminLogin(req, res) {
  const { username, password } = req.body;
  const userFilePath = path.join(usersDirectory, `${username}.json`);

  try {
    await fs.access(userFilePath);

    const data = await fs.readFile(userFilePath, 'utf8');
    const userData = JSON.parse(data);
    const isMatch = await bcrypt.compare(password, userData.passwordHash);

    if (isMatch) {
      const payload = { id: userData.id, username: userData.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token, { httpOnly: true, secure: true });
      console.log(`Token for user ${username}: ${token}`);
      res.status(200).json({ message: "Login successful", token: `Bearer ${token}` });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      res.status(500).json({ message: "Server error while processing login" });
    }
  }
}

export async function adminRegister(req, res) {
  const { username, password } = req.body;
  const userFilePath = path.join(usersDirectory, `${username}.json`);

  try {
    await fs.stat(userFilePath);
    return res.status(409).json({ message: "User already exists" });
  } catch (err) {
    if (err.code !== 'ENOENT') {
      return res.status(500).json({ message: "Error checking user existence" });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const userData = { username, passwordHash: hash };

    try {
      await fs.writeFile(userFilePath, JSON.stringify(userData, null, 2), 'utf8');
      res.status(200).json({ message: `Welcome to Shelly University, ${username}` });
    } catch (writeErr) {
      res.status(500).json({ message: "Failed to register user" });
    }
  }
}
