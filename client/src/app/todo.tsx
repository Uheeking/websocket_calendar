import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsCheckLg, BsFillTrash3Fill } from "react-icons/bs";
import "./todo.css";

function TodoList(props) {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false);

  const handleConfirm = async (id) => {
    try {
      const userConfirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (userConfirmed) {
        const response = await axios.post(
          `http://localhost:5001/api/todos/${id}`
        );

        if (response.status === 200) {
          location.reload();
        } else {
          console.error(`Unexpected response status: ${response.status}`);
        }
        window.prompt('삭제되었습니다. ')
        setConfirmed(true);
      } else {
        window.prompt('삭제되지 않았습니다. ')
        setConfirmed(false);
      }
    } catch (error) {
      console.error("Error deleting a To-Do item:", error);
    }
  };

  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };

  const textDecorationStyle = {
    textDecoration: isChecked ? "line-through" : "none",
  };

  const handleAddTodo = async () => {
    if (inputText) {
      try {
        const response = await axios.post("http://localhost:5001/api/todos", {
          day: props.value,
          todo: inputText,
          completed: false,
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
    axios
      .get("http://localhost:5001/api/todos")
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
          <li key={todo._id} className="borderLine">
            <div>
              <p style={textDecorationStyle}>Day: {todo.day}</p>
              <p style={textDecorationStyle}>Text: {todo.todo}</p>
              <p style={textDecorationStyle}>
                Completed: {todo.completed ? "Yes" : "No"}
              </p>
            </div>
            <div className="twoDivStyle">
              <BsCheckLg
                onClick={toggleCheckbox}
                className="hoverStyle"
              />
              <BsFillTrash3Fill
                className="hoverStyle"
                onClick={() => handleConfirm(todo._id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
