"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./page.css";
import socket from "./server";
import axios from "axios";
import TodoList from "./todo";
import Message from "./message";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Page() {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState([]);
  const [user, setUser] = useState();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/todos")
      .then((response) => {
        const data = response.data;
        const days = data.map((item: any) => item.day); 
        setDay(days); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    const userName = prompt("당신의 이름을 입력하세요.");
    console.log("user", userName);

    socket.emit("login", userName, (res: any) => {
      console.log("res", res);
      if (res?.ok) {
        setUser(res.data.name);
      }
    });
  }, []);

  return (
    <div
      key="1"
      className="containerStyle min-h-screen flex flex-col bg-gradient-to-r from-purple-200 to-blue-200"
    >
      <Message messageList={messageList} user={user}/>
      <div className="calendar-container">
        <h2 className="text-lg font-medium m-3">Calendar</h2>
        <Calendar
          onChange={setDate}
          value={date}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileContent={({ date }) => {
            if (day.includes(moment(date).format("YYYY-MM-DD"))) {
              return <div className="dotStyle"></div>;
            }
          }}
        />
        <div className="divStyle">
          <div className="date-label text-lg font-medium m-2">
            {moment(date).format("YYYY년 MM월 DD일")}
          </div>
          <div className="App">
            <h1>My To-Do App</h1>
          </div>
        </div>
        <TodoList value={moment(date).format("YYYY-MM-DD")} />
      </div>
    </div>
  );
}
