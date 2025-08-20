import React, { useEffect, useState } from "react";
import "./App.css";

const List = () => {
  const [inputValue, setInputValue] = useState("");
  const [lists, setLists] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    setLists([...lists, { text: inputValue.trim(), completed: false }]);
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

  const sortAlphabatecally = () => {
    if (editIndex !== null) return;

    setLists((prev) =>
      [...prev].sort((a, b) =>
        a.text.localeCompare(b.text, undefined, {
          sensitivity: "base",
          numeric: true,
        })
      )
    );
  };

  const filteredLists = lists.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="sortItems">
        <button
          onClick={sortAlphabatecally}
          disabled={lists.length < 2 || editIndex !== null}
        >
          Sort Items A➡️Z
        </button>
      </div>

      <div className="searchField">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search items ..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {filteredLists.length > 0
          ? filteredLists.map((list, index) => {
              const originalIndex = lists.indexOf(list);

              return (
                <li
                  key={originalIndex}
                  className={list.completed ? "completed" : ""}
                >
                  <input
                    type="checkbox"
                    checked={list.completed}
                    onChange={() => toggleComplete(originalIndex)}
                  />

                  {editIndex === originalIndex ? (
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(originalIndex);
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />

                      <button onClick={() => saveEdit(originalIndex)}>
                        Save
                      </button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <span>{list.text}</span>
                      <button onClick={() => startEdit(originalIndex)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(originalIndex)}>
                        ❌
                      </button>
                    </>
                  )}
                </li>
              );
            })
          : searchTerm.length > 0 && (
              <li className="not-found">❌ No items found</li>
            )}
      </ul>
      {lists.length > 1 ? (
        <button onClick={handleDeleteAll}>Delete All</button>
      ) : null}
    </div>
  );
};

export default List;
