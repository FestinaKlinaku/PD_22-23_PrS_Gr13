const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.get("/users.json", (req, res) => {
  res.sendFile("./users.json", { root: __dirname }); // Specify the root directory for the file
});

// API endpoint for user registration
app.post("/register", (req, res) => {
  // Read the users.json file
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Parse the JSON data or initialize an empty object if the file is empty
    const users = data ? JSON.parse(data) : { userList: [] };

    // Extract registration data from the request body
    const { name, email, password } = req.body;

    // Create a new user object
    const newUser = {
      name: name,
      email: email,
      password: password,
      teacher: false,
    };

    // Add the new user to the user list
    users.userList.push(newUser);

    // Write the updated data back to users.json
    fs.writeFile(
      "users.json",
      JSON.stringify(users, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }

        // Respond with success message
        res.status(200).send("User registration successful");
      }
    );
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
