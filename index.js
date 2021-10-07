const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const express = require("express");
const port = process.env.PORT || 3000;

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", ({ name, msg }) => {
    io.emit("chat message", {
      name: name,
      msg : msg
    });
  });

  console.log(io.engine.clientsCount);
  ip = socket.conn.remoteAddress.split(":")[3];
  if (ip == undefined) ip = "host's ip";
  console.log(ip);
  io.emit("address", ip);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
