const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "movie_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("Database connection established");
});


app.post("/movies", (req, res) => {
    const { title, director, release_year, genre, rating, duration, language } = req.body;
    const sql = "INSERT INTO movies (title, director, release_year, genre, rating, duration, language) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [title, director, release_year, genre, rating, duration, language], (err, result) => {
        if (err) throw err;
        res.json({ message: "Movie created successfully", id: result.insertId });
    });
});


app.get("/movies", (req, res) => {
    db.query("SELECT * FROM movies", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.get("/movies/:id", (req, res) => {
    db.query("SELECT * FROM movies WHERE id = ?", [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result[0] || { message: "Movie not found" });
    });
});


app.put("/movies/:id", (req, res) => {
    const { title, director, release_year, genre, rating, duration, language } = req.body;
    const sql = "UPDATE movies SET title=?, director=?, release_year=?, genre=?, rating=?, duration=?, language=? WHERE id=?";
    
    db.query(sql, [title, director, release_year, genre, rating, duration, language, req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: "Movie updated successfully" });
    });
});

app.delete("/movies/:id", (req, res) => {
    db.query("DELETE FROM movies WHERE id = ?", [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: "Movie deleted successfully" });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});