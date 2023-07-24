//initializing express server
import express from "express";
import config from "./dbas/config.js";
import Authroutes from "./routes/auth.js";
import Usersroutes from "./routes/Users.js";
import Postsroutes from "./routes/Posts.js";
import { addcomment } from "./Controllers/Comments.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { log } from "console";
import Likesroutes from "./routes/likes.js";

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
//create socket.io server 
io.on('connection', (socket)=>{
  console.log(`user connected : ${socket.id}`);

  //join room
  socket.on('join_room', (data)=>{
    socket.join(data);
    console.log(`user with id : ${socket.id} joined room : ${data}`);
  }
  );
  //send message
  socket.on('send_message', (data)=>{
    socket.to(data.room).emit('receive_message', data);
  }
  );
  //leave room
  socket.on('leave_room', (data)=>{
    socket.leave(data);
    console.log(`user with id : ${socket.id} left room : ${data}`);
  }
  );
});


Authroutes(app);
Usersroutes(app);
Postsroutes(app);
Likesroutes(app);
addcomment(app);


app.get("/", (req, res) => {
  res.send("Hello World");
});
server.listen(config.port, () => {
  console.log(`server successfully running on port ${config.url}`);
});
