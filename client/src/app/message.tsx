import React, { useState } from "react";
import InputField from "./inputField";
import socket from "./server";

const MessageContainer = ({ messageList, user }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (event, value) => {
    event.preventDefault();
    console.log('selectitem',value);
    
    socket.emit("sendMessage", message, (res) => {
      console.log("send message", res);
    });
    setMessage("")
  };
  
  return (
    <main className="flex-1 p-4 flex justify-center">
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-4/5 md:w-3/4 lg:w-full xl:w-full">
        <div className="flex justify-between p-3 border-b">
          <h2 className="text-lg font-medium">Chat</h2>
          <svg
            className="h-4 w-4 text-gray-600"
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
          {messageList.map((message, index) => (
            
            <div
              key={index}
              className={`flex items-center space-x-3 p-2 ${
                message.user.name === user ? "justify-end" : ""
              }`}
            >
                {message.user.name === user ? (<>
              <p
                className={`rounded-md py-2 px-3 text-sm ${
                  message.user.name === user
                    ? "bg-blue-300"
                    : "bg-gray-300"
                }`}
              >
                {message.chat}
              </p>
              <img
                alt={message.user.name}
                className="rounded-full"
                height="32"
                src="./placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              /></>) : (<>
              <img
                  alt={message.user.name}
                  className="rounded-full"
                  height="32"
                  src="./placeholder.png"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <p
                  className={`rounded-md py-2 px-3 text-sm ${
                    message.user.name === user
                      ? "bg-blue-300"
                      : "bg-gray-300"
                  }`}
                >
                  {message.chat}
                </p>
                </>)}
            </div>
          ))}
        </div>
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </main>
  );
};

export default MessageContainer;
