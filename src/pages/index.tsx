import io from "socket.io-client";
import { useState, useEffect } from "react";
import { User } from "../utils/userHandler"

let socket;

type Message = {
  author: User;
  message: string;
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");
  const [user, setUser] = useState<User>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    userInitializer();
  }, []);

  const userInitializer = async() => {
    if (user === undefined) {
      const response = await fetch('/api/user');
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
        setColor(data.user.color);
        socketInitializer();
      } else {
        colorIntializer();
      }
    }
  }

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
      console.log(messages);
    });
  };

  const colorIntializer= async () => {
    const response = await fetch('/api/user-color');
    console.log(JSON.stringify(response))
    const data = await response.json();
    setColor(data.color);
}
  
  const sendMessage = async () => {
    socket.emit("createdMessage", { author: user, message });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: user, message },
    ]);
    setMessage("");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <div className='flex items-center p-4 mx-auto min-h-screen justify-center' style={{backgroundColor: color}}>
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        {!user ? (
          <>
            <h3 className="font-bold text-white text-xl">
              What should we call you?
            </h3>
            <input
              type="text"
              placeholder="Identity..."
              value={username}
              className="p-3 rounded-md outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={() => {
                setUser({ name: username, color });
                socketInitializer();
              }}
              className="bg-white rounded-md px-4 py-2 text-xl"
            >
              Go!
            </button>
          </>
        ) : (
          <>
            <p className="font-bold text-white text-xl">
              Your username: {username}
            </p>
            <div className="flex flex-col justify-end bg-white h-[40rem] w-95vw min-w-[95%] rounded-md shadow-md ">
              <div className="h-full last:border-b-0 overflow-y-scroll">
                {messages.map((msg, i) => {
                  return (
                    <div
                      className="w-full py-1 px-2 border-b border-gray-200"
                      style = {{backgroundColor: msg.author.color, opacity: ".8"}}
                      key={i}
                    > 
                    {msg.author.name} : {msg.message}
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-300 w-full flex rounded-bl-md">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                  <button
                    className="group-hover:text-white px-3 h-full"
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

