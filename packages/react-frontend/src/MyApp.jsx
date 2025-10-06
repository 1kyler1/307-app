
// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

const initialCharacters = [
  { name: "Charlie", job: "Janitor" },
  { name: "Mac", job: "Bouncer" },
  { name: "Dee", job: "Aspiring actress" },
  { name: "Dennis", job: "Bartender" }
];

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) { 
    postUser(person)
      .then(async (res) => {
        if (res.status === 201) {
          const createdUser = await res.json();
          setCharacters((prev) => [...prev, createdUser]); 
        } else {
          console.warn(`No update — backend returned status ${res.status}`);
        }
      })
      .catch((error) => console.error("Error creating user:", error));
  }

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }


  function removeOneCharacter(id) {
    deleteUser(id)
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) => prev.filter((u) => u.id !== id));
        } else if (res.status === 404) {
          console.warn("No update — backend says resource not found (404).");
        } else {
          throw new Error(`Unexpected status: ${res.status}`);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

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
