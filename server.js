//initializing express server
import express from "express";
import config from "./dbas/config.js";
import Authroutes from "./routes/auth.js";
import Usersroutes from "./routes/Users.js";
import Postsroutes from "./routes/Posts.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

//starting express server
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

Authroutes(app);
Usersroutes(app);
Postsroutes(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});
server.listen(config.port, () => {
  console.log(`server successfully running on port ${config.url}`);
});
