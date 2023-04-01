import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
const token = "random-string-token";

function App() {
  const [socket, setSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<Array<string>>([]);
  const [newData, setNewData] = useState<any>({});

  useEffect(() => {
    console.log(messages)
  }, [messages.length])


  useEffect(() => {
    //utworzenie WebSocketu
    const url = "ws://localhost:8000/ws";
    const newSocket = new WebSocket(url);

    //przypisanie do zmiennej socket
    setSocket(newSocket);

    //wysłanie tokena na połączenie
    newSocket.onopen = (event: any) => {
      newSocket.send(
        JSON.stringify({
          token: token,
        })
      );
    };

    //utworzenie listetenra na przyjście messege
    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNewData(data);
      let newMessages = messages;

      if (data && data.message) {
        newMessages.push(data.message);
      }
      setMessages(newMessages);
    };

    //zamknięcie socketa przy opuszczeniu komponentu
    return () => {
      newSocket.close();
    };
  }, []);


  return (
    <div>
      {messages.map((message, index) => {
        return <p key={index}>{message}</p>;
      })}
    </div>
  );
}

export default App;
