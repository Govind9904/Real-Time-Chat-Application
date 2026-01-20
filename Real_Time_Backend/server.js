require("dotenv").config(); // Must be first
const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
const authRoutes = require("./Routes/authRoute");
const connectDB = require("./Database/db"); // Mongo connection
const SocketController = require("./Controller/SocketController");


const app = express();
const server = http.createServer(app);

// Connect MongoDB
connectDB();

const SocketIO = new Server(server,{
  cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  },
});

SocketController(SocketIO);



// Middleware
app.use(cors());
app.use(express.json());

app.use("/api",authRoutes);


// Start server
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
