import {useEffect, useState} from 'react'
import "./App.css";
import socket from "./server";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    askUsereName();
  }, [])
  
  const askUsereName = () => {
    const userName = prompt("당신의 이름을 입력하세요.")
    console.log("user",userName);

    socket.emit("login",userName, (res)=>{
      console.log("res",res);
      if(res?.ok){
        setUser(res.data)
      }
    })
  }
  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;
