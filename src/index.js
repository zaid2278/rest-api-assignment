const express = require("express");
const { v4: uuidv4 } = require("uuid");



const app = express();
app.use(express.json());

let users = [];

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = { id: uuidv4(), name, email };
  users.push(newUser);
  return res.status(201).json(newUser);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json(user);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });

  users[idx] = { id, name, email };
  return res.json(users[idx]);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });

  users.splice(idx, 1);
  return res.status(204).send();
});

module.exports = app;
