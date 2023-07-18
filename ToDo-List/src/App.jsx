import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    // when no value is in the local storage returns empty array 
    if (localValue == null) return ([])
    //otherwise return
    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;

    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false }
    ]);

    setNewItem("");
  }

  function addTodo(title) {
    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false }
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(currentTodos =>
      currentTodos.filter(todo => todo.id !== id)
    );
  }

  console.log(todos);

  return (
    <>
      <form onSubmit={handleSubmit} className="newForm">
        <div className="formRow">
          <label htmlFor="item">Add New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            name=""
            id="item"
          />
        </div>
        <button className="btn">ADD</button>
      </form>

      <h1 className="header">To Do</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.title}
            </label>
            <button onClick={() => deleteTodo(todo.id)} className="del-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
