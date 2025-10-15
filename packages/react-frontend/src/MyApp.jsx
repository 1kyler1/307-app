// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // Helper function to normalize server docs so everything has .id
  const normalizeUser = (u) => ({
    id: u._id ?? u.id,   
    _id: u._id ?? u.id,
    name: u.name,
    job: u.job,
  });

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list.map(normalizeUser)))
      .catch((error) => console.error(error));
  }, []);

  function updateList(person) { 
    postUser(person)
      .then(async (res) => {
        if (res.status === 201) {
          const created = await res.json();
          setCharacters((prev) => [...prev, normalizeUser(created)]);
        } else {
          console.warn(`No update, backend returned status ${res.status}`);
        }
      })
      .catch((error) => console.error("Error creating user:", error));
  }

  function removeOneCharacter(id) {
    deleteUser(id)
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) => prev.filter((u) => u.id !== id));
        } else if (res.status === 404) {
          console.warn("No update, backend says resource not found (404).");
        } else {
          throw new Error(`Unexpected status: ${res.status}`);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter} 
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

