const express = require("express");
const app = express();
const port = 3000;

// Set view engine
app.set("view engine", "ejs");

// Enable file access
app.use(express.static("public"));
// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// Start Express server
app.listen(port, () => {
    console.log("Listening on port: " + port);
});//listen

// Start server
// app.listen(process.env.PORT, process.env.IP, function() {
//     console.log('Running express server');
//   });