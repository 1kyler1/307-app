
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
    const rows = characterData.map((row, index) => {
      const rowId = row.id ?? index; // fallback during transition/testing
      return (
        <tr key={rowId}>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>{row.id}</td>
          <td>
            <button onClick={() => removeCharacter(row.id ?? null)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  
    return <tbody>{rows}</tbody>;
  }
  
  function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody
          characterData={props.characterData}
          removeCharacter={props.removeCharacter}
        />
      </table>
    );
  }
  
  export default Table;
  