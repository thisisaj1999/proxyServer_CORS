const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
// enable CORS
app.use(cors());
// set the port on which our app wil run
// important to read from environment variable if deploying
const port = process.env.PORT || 5000;

// basic string route to prevent Glitch error
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// the route we're working with
app.get("/api", (req, res) => {
    // replace with a custom URL as required
    const backendUrl = `https://cdn.premarket.ly/users/users/114/properties/1121/image-4b65a37e-685e-4234-b482-190df7a5afc9.jpg`;
    // return the data without modification
    const response = axios.get(backendUrl);
    console.log(response)
    return res.json(response.data)
});

// console text when app is running
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});