import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList(props:any) {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = async () => {
    if (inputText) {
      try {
        const response = await axios.post("http://localhost:5001/api/todos", {
          day: props.value,
          todo: inputText,
          completed: false
        });

        if (response.status === 200) {
          setTodos([...todos, inputText]);
          location.reload();
        }
      } catch (error) {
        console.error("Error adding a To-Do item:", error);
      }
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5001/api/todos")
      .then((response) => {
        console.log(response.data);
        
        const todosData = response.data;
        setTodos(todosData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div>
        <form>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a new To-Do"
        />
        <button onClick={handleAddTodo}>Add</button>
        </form>
      </div>
      <ul>
      {todos.map((todo, index) => (
          <li key={todo._id}>
            <p>Text: {todo.todo}</p>
            <p>Day: {todo.day}</p>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
