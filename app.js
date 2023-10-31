const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const {createServer} = require("http");
const {Server} = require("socket.io");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: "http://localhost:3000"
    }
})

require('./utils/io')(io)

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to database"));
app.use(bodyParser.json());
app.use("/api", require("./api"));
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
