const express = require("express");
const tools = require("./tools.js");
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

app.get("/saved_events", async function(req, res) {
    var conn = tools.createConnection();
    var sql = "SELECT DISTINCT tmID, imageURL, eventName, eventLink, eventDate FROM favorites ORDER BY id ASC";

    conn.connect(function(err) {
        if (err) throw err;
        conn.query(sql, function(err, results) {
            console.log(results);
            res.render("saved_events", {rows: results});
        });//query
    });//connect
    
})

app.get("/api/updateFavorites", (req, res) => {
    var conn = tools.createConnection();
    var sql, sqlParams;

    // Generate SQL query to execute
    if (req.query.action == "add") {
        sql = "INSERT INTO favorites (tmId, imageURL, eventName, eventLink, eventDate) VALUES (?, ?, ?, ?, ?)";
        sqlParams = [req.query.tmId, req.query.imageURL, req.query.eventName, req.query.eventLink, req.query.eventDate];
    } else {
        sql = "DELETE FROM favorites WHERE tmId = (?)";
        sqlParams = [req.query.tmId];
    }

    // Execute query
    conn.connect(function(err) {

        if (err) throw err;
        console.log("Connected!");
        console.log("Query: " + sql);
        console.log("Param: " + sqlParams);
        conn.query(sql, sqlParams, function(err, result) {
            console.log(result);
            conn.end();
        });
    });
    res.send("It works!");
});

// Start Express server
// app.listen(port, () => {
//     console.log("Listening on port: " + port);
// });//listen

// Start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Running express server');
});