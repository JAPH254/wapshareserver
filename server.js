//initializing express server
import express from "express";
import config from "./dbas/config.js"
import Authroutes from "./routes/auth.js";

//starting express server
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Authroutes(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(config.port, () => {
  console.log(`server started on port ${config.url}`);
});
