import React, { useState, useEffect, useRef } from "react";
import socket from "../Socket";
import "../Component/Socket_UI.css"; // we'll add styles

function Socket() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => console.log("✅ Connected:", socket.id));

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("disconnect", () => console.log("❌ Disconnected"));

    return () => {
      socket.off("connect");
      socket.off("receive_message");
      socket.off("disconnect");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      text: message,
      sender: "You",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", data);
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Chats</h3>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h3>WhatsApp Clone</h3>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-message ${
                msg.sender === "You" ? "sent" : "received"
              }`}
            >
              <p>{msg.text}</p>
              <small>{msg.time}</small>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Socket;
