
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
          setCharacters((prev) => [...prev, createdUser]); // ✅ Add only if created
        } else {
          console.warn(`No update — backend returned status ${res.status}`);
        }
      })
      .catch((error) => console.error("Error creating user:", error));
  }


  function removeOneCharacter(index) {
    setCharacters((prev) => prev.filter((_, i) => i !== index));
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
