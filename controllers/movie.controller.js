const db = require('../config/db.config');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const movie = {
        title: req.body.title,
        director: req.body.director,
        release_year: req.body.release_year,
        genre: req.body.genre
    };

    db.query("INSERT INTO movies SET ?", movie, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the movie."
            });
        } else {
            res.send({
                message: "Movie was created successfully.",
                id: data.insertId,
                ...movie
            });
        }
    });
};

exports.findAll = (req, res) => {
    db.query("SELECT * FROM movies", (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving movies."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    db.query("SELECT * FROM movies WHERE id = ?", [req.params.id], (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error retrieving movie with id " + req.params.id
            });
        } else if (data.length) {
            res.send(data[0]);
        } else {
            res.status(404).send({
                message: `Movie not found with id ${req.params.id}`
            });
        }
    });
};