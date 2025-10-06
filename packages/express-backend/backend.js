// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",                   
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      },
      {
        id: "zap555",
        name: "Lebron",
        job: "Jameson"
      }
    ]
};

const findUsers = ({ name, job }) =>
  users.users_list.filter(u => {
    const matchName = name ? u.name === name : true;
    const matchJob = job ? u.job === job : true;
    return matchName && matchJob;
  });
app.get("/users", (req, res) => {
    const { name, job } = req.query;
    if (name !== undefined || job !== undefined) {
        const result = findUsers({ name, job });
    return res.send({ users_list: result });
    }
    return res.send(users);
});

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

const removeUsersById = (id) => {
    const before = users.users_list.length;
    users.users_list = users.users_list.filter((u) => u.id !== id);
    const after = users.users_list.length;
    return before - after; // number of records deleted
};

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const deletedCount = removeUsersById(id);
  
    if (deletedCount === 0) {
      return res.status(404).send("Resource not found.");
    }
    return res.status(204).send();
  });

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};
  
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
}); 