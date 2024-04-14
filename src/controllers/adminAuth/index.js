export function adminLogin(req, res) {
  {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
    res.status(200).json({ message: "Login successful" });
  }
}
