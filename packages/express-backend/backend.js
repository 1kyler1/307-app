// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// 1) GET /users
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userServices
    .getUsers(name, job)
    .then((docs) => res.send({ users_list: docs }))
    .catch((err) => {
      console.error("GET /users error:", err);
      res.status(500).send("Internal server error.");
    });
});

// 2) GET /users/:id
app.get("/users/:id", (req, res) => {
  userServices
    .findUserById(req.params.id)
    .then((doc) => (doc ? res.send(doc) : res.status(404).send("Resource not found.")))
    .catch(() => res.status(404).send("Resource not found."));
});

// 3) POST /users  (create)
app.post("/users", (req, res) => {
  const { name, job } = req.body || {};
  if (!name || !job) {
    return res.status(400).send("Missing required fields: name and job.");
  }

  userServices
    .addUser({ name, job })
    .then((created) => res.status(201).send(created))
    .catch((err) => {
      console.error("POST /users error:", err);
      if (err?.name === "ValidationError") {
        return res.status(400).send(err.message);
      }
      res.status(500).send("Internal server error.");
    });
});

app.delete("/users/:id", (req, res) => {
  userServices
    .removeUserById(req.params.id)
    .then((deleted) => {
      if (!deleted) return res.status(404).send("Resource not found.");
      res.status(204).send();
    })
    .catch((err) => {
      console.error("DELETE /users/:id error:", err);
      res.status(500).send("Internal server error.");
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
}); 


