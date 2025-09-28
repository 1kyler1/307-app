
// src/MyApp.jsx
import React, { useState } from "react";
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

  function removeOneCharacter(index) {
    setCharacters((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form />
    </div>
  );
}

export default MyApp;
