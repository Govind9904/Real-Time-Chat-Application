module.exports  = (io) => {
    io.on("connection",(socket)=>{
        console.log("User connected:", socket.id);
        socket.emit("receive_message", {
            text: "Welcome! You are connected to the server.",
        });
        // Listen for message from frontend
        socket.on("send_message", (data) => {
            socket.emit("receive_message", {
            text: "Welcome",
        });
        console.log("Message received from client:", data);

        // Send message to all connected clients
        io.emit("receive_message", data);
        })

    });
}