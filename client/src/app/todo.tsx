import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsCheckLg, BsFillTrash3Fill } from "react-icons/bs";
import "./todo.css";

function TodoList(props : any) {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleConfirm = async (id : any) => {
    try {
      const userConfirmed = window.confirm("정말로 삭제하시겠습니까?");
      if (userConfirmed) {
        await axios.delete(`http://localhost:5001/api/todos/${id}`);
        setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id));
        window.alert('삭제되었습니다.');
      } else {
        window.alert('삭제되지 않았습니다.');
      }
    } catch (error : any) {
      console.error("Error deleting a To-Do item:", error);
      window.alert('삭제 실패: ' + error.message);
    }
  };

  const toggleCheckbox = (id : any) => {
    setTodos((prevTodos : any) => {
      return prevTodos.map((todo : any) => {
        if (todo._id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
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
          setTodos([...todos, response.data]);
          setInputText("");
        }
      } catch (error : any) {
        console.error("Error adding a To-Do item:", error);
        window.prompt('추가 실패: ' + error.message);
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
        window.prompt('데이터 가져오기 실패: ' + error.message);
      });
  }, []);

  return (
    <div>
      <div className="divStyle">
        <form>
          <input
          className="mr-1"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a new To-Do"
          />
          <button className="bg-gradient-to-r from-purple-200 to-blue-200 addStyle" onClick={handleAddTodo}>Add</button>
        </form>
      </div>
      <ul>
        {todos.map((todo : any) => (
          <li key={todo._id} className="borderLine">
            <div>
              <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                Day: {todo.day}
              </p>
              <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                Text: {todo.todo}
              </p>
              <p>
                Completed: {todo.completed ? "Yes" : "No"}
              </p>
            </div>
            <div className="twoDivStyle hoverStyle">
              <BsCheckLg
                onClick={() => toggleCheckbox(todo._id)}
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
