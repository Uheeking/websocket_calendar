"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./page.css";
import socket from "./server";
import axios from "axios";
import TodoList from "./todo";
import InputField from "./inputField";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Component() {
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [day, setDay] = useState([]);
  const [user, setUser] = useState();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/todos")
      .then((response) => {
        const data = response.data;
        const days = data.map((item: any) => item.day); // Create a new array with 'day' values
        setDay(days); // Set the 'day' state with the new array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    socket.on("message", (message) => {
      setMessageList((prevState)=>prevState.concat(message))
    });
    const userName = prompt("당신의 이름을 입력하세요.");
    console.log("user", userName);

    socket.emit("login", userName, (res: any) => {
      console.log("res", res);
      if (res?.ok) {
        setUser(res.data);
      }
    });
  }, []);

  const sendMessage = (event : any) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res:any) => {
      console.log("send mess", res);
    });
  };
  return (
    <div
      key="1"
      className="containerStyle min-h-screen flex flex-col bg-gradient-to-r from-purple-200 to-blue-200"
    >
      <div></div>
      <main className="flex-1 p-4 flex justify-center">
        <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-4/5 md:w-3/4 lg:w-full xl:w-full">
          <div className="flex justify-between p-3 border-b">
            <h2 className="text-lg font-medium">Chat</h2>
            <svg
              className=" h-4 w-4 text-gray-600"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </div>
          <div className="p-3 h-3/4 overflow-y-scroll">
            <div className="flex items-center space-x-3 p-2">
              <img
                alt="Chat Bot"
                className="rounded-full"
                height="32"
                src="/placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <p className="bg-gray-300 rounded-md py-2 px-3 text-sm">
                Hello! Let's start the test.
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3 p-2">
              <p className="bg-blue-300 rounded-md py-2 px-3 text-sm">
                Example chat from me 1.
              </p>
              <img
                alt="Me"
                className="rounded-full"
                height="32"
                src="./placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
            </div>
          </div>
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
          {/* <div className="border-t p-3">
              <div className="plus-button">+</div>
              <form className="flex input-container">
                <div className="flex-1">
                  <Input
                    placeholder="Type your answer..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    multiline={false}
                    rows={1}
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                  />
                  <br />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Options</SelectLabel>
                        <SelectItem value="option1">뭐해?</SelectItem>
                        <SelectItem value="option2">놀자!</SelectItem>
                        <SelectItem value="option3">만나자!</SelectItem>
                        <SelectItem value="option4">내일 뭐해?</SelectItem>
                        <SelectItem value="option5">잘 자~</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="">
                  <Button
                    className="send-button ml-2 h-full bg-gray-700 text-white text-sm"
                    type="submit"
                    disabled={message === ""}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div> */}
        </div>
      </main>
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
