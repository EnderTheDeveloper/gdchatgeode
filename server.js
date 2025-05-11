const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = [];

app.post("/send", (req, res) => {
  const { username, message } = req.body;
  if (!username || !message) return res.status(400).send("Invalid request");
  messages.push({ username, message, time: Date.now() });
  if (messages.length > 50) messages.shift();
  res.send({ status: "ok" });
});
app.post("/clear", (req, res) => {
  if (req.body.secret !== "clear-key") {
    return res.status(403).send("Forbidden");
  }
  messages = [];
  res.send({ status: "cleared" });
});
app.get("/messages", (req, res) => {
  res.json(messages);
});

app.listen(3000, () => console.log("chat server running"));
