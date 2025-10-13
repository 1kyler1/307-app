// src/Table.jsx
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>ID</th>
        <th></th>
      </tr>
    </thead>
  );
}

function TableBody({ characterData, removeCharacter }) {
  return (
    <tbody>
      {characterData.map((row) => {
        const id = row.id ?? row._id;           
        return (
          <tr key={id}>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>{id}</td>                       
            <td>
              <button
                disabled={!id}                   
                onClick={() => id && removeCharacter(id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default function Table({ characterData, removeCharacter }) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={characterData}
        removeCharacter={removeCharacter}
      />
    </table>
  );
}

  