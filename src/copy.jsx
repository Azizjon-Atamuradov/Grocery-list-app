import React, { useState } from "react";
import "./App.css";

const List = () => {
  // ✅ State for new input field
  const [inputValue, setInputValue] = useState("");
  // ✅ State for the list of items
  const [lists, setLists] = useState([]);
  // ✅ States for editing
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  // ✅ NEW: State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Add new item
  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    setLists([...lists, { text: inputValue.trim(), completed: false }]);
    setInputValue("");
  };

  // ✅ Delete a single item
  const handleDelete = (indexDelete) => {
    let newList = [...lists];
    const updatedList = newList.filter((_, index) => index !== indexDelete);
    setLists(updatedList);
  };

  // ✅ Toggle completed state
  const toggleComplete = (index) => {
    const updatedList = [...lists];
    updatedList[index].completed = !updatedList[index].completed;
    setLists(updatedList);
  };

  // ✅ Start editing (open edit mode for correct item)
  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(lists[index].text); // show correct item text
  };

  // ✅ Save edited value
  const saveEdit = (index) => {
    if (editValue.trim() === "") return;
    const updatedList = lists.map((item, i) =>
      i === index ? { ...item, text: editValue } : item
    );
    setLists(updatedList);
    setEditIndex(null);
    setEditValue("");
  };

  // ✅ Cancel editing
  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  // ✅ Delete all items
  const handleDeleteAll = () => {
    setLists([]);
  };

  // ✅ Sort alphabetically
  const sortAlphabatecally = () => {
    if (editIndex !== null) return; // don’t sort while editing

    setLists((prev) =>
      [...prev].sort((a, b) =>
        a.text.localeCompare(b.text, undefined, {
          sensitivity: "base",
          numeric: true,
        })
      )
    );
  };

  // ✅ NEW: Create filtered list based on search
  const filteredLists = lists.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Grocery Shopping List</h1>

      {/* ================= ADD NEW ITEM SECTION ================= */}
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
              <button onClick={handleSubmit}>Add</button>
              
        <button
          onClick={sortAlphabatecally}
          disabled={lists.length < 2 || editIndex !== null}
        >
          Sort Items A➡️Z
        </button>
      </div>

      {/* ================= NEW: SEARCH BAR ================= */}
      <div className="searchField">
        <input
          type="text"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ================= RENDER LIST ================= */}
      <ul>
        {filteredLists.length > 0 ? (
          filteredLists.map((list, index) => {
            // ✅ IMPORTANT FIX: find the original index in the full list
            // So editing/deleting affects the right item even when filtered
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

                {/* ================= EDIT MODE ================= */}
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
                    <button onClick={() => saveEdit(originalIndex)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{list.text}</span>
                    <button onClick={() => startEdit(originalIndex)}>Edit</button>
                    <button onClick={() => handleDelete(originalIndex)}>❌</button>
                  </>
                )}
              </li>
            );
          })
        ) : (
          // ✅ Show this if no items match the search
          searchTerm.length > 0 && (
            <li className="not-found">❌ No items found</li>
          )
        )}
      </ul>

      {/* ================= DELETE ALL ================= */}
      {lists.length > 1 ? (
        <button onClick={handleDeleteAll}>Delete All</button>
      ) : null}
    </div>
  );
};

export default List;
