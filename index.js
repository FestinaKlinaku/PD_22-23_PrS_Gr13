const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const fs = require("fs");
const { readFile, writeFile } = fs.promises;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/users.json", (req, res) => {
  res.sendFile(path.join(__dirname, "users.json"));
});

app.get("/assignments.json", (req, res) => {
  res.sendFile(path.join(__dirname, "assignments.json"));
});

app.post("/assignments.json", async (req, res) => {
  const newAssignment = req.body;

  try {
    // Read the existing assignments from the file
    const data = await readFile(path.join(__dirname, "assignments.json"));
    const assignments = JSON.parse(data);

    // Add the new assignment to the assignments array
    assignments.push(newAssignment);

    // Write the updated assignments back to the file
    await writeFile(
      path.join(__dirname, "assignments.json"),
      JSON.stringify(assignments)
    );

    // Emit the updated assignments to all connected clients
    io.emit("new-assignment", assignments);

    // Send a success response
    res.json({ message: "Assignment added and saved successfully" });
  } catch (err) {
    console.error("Error reading/writing assignments file:", err);
    res.status(500).json({ error: "Error reading/writing assignments file" });
  }
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
});

io.on("connection", (socket) => {
  socket.emit("connections", Object.keys(io.sockets.connected).length);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat-message", (data) => {
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });

  socket.on("joined", (data) => {
    socket.broadcast.emit("joined", data);
  });

  socket.on("leave", (data) => {
    socket.broadcast.emit("leave", data);
  });
});
