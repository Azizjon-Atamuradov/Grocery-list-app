import React, { useEffect, useState } from "react";
import "./App.css";

const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [lists, setLists] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    setLists([...lists, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const handleDelete = (indexDelete) => {
    let newList = [...lists];
    const updatedList = newList.filter((_, index) => index !== indexDelete);
    setLists(updatedList);
  };

  const toggleComplete = (index) => {
    const updatedList = [...lists];
    updatedList[index].completed = !updatedList[index].completed;
    setLists(updatedList);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(lists[index].text);
  };

  const saveEdit = (index) => {
    if (editValue.trim() === "") return;
    const updatedList = lists.map((item, i) =>
      i === index ? { ...item, text: editValue } : item
    );
    setLists(updatedList);
    setEditIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleDeleteAll = () => {
    setLists([]);
  };

  return (
    <div className="container">
      <h1>Grocery Shopping List</h1>
      <div className="inputField">
        <input
          type="text"
          value={inputValue}
          placeholder="Add something to your list"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <button onClick={() => handleSubmit()}>Add</button>
      </div>
      <ul>
        {lists.map((list, index) => (
          <li key={index} className={list.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={list.completed}
              onChange={() => toggleComplete(index)}
            />

            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(index);
                    if (e.key === "Escape") cancelEdit();
                  }}
                />

                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <>
                  <span>{list.text}</span>
                  <button onClick={() => startEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>❌</button>
                </>
              </>
            )}
          </li>
        ))}
      </ul>
        { lists.length > 1 ?   <button onClick={handleDeleteAll}>Delete All</button> : null   }   
    </div>
  );
};

export default List;
