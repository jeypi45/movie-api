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
        genre: req.body.genre,
        rating: req.body.rating,
        duration: req.body.duration,
        language: req.body.language
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

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const id = req.params.id;
    const movie = {
        title: req.body.title,
        director: req.body.director,
        release_year: req.body.release_year,
        genre: req.body.genre,
        rating: req.body.rating,
        duration: req.body.duration,
        language: req.body.language
    };

    db.query("UPDATE movies SET ? WHERE id = ?", [movie, id], (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error updating movie with id " + id
            });
        } else if (data.affectedRows == 0) {
            res.status(404).send({
                message: `Movie not found with id ${id}`
            });
        } else {
            res.send({
                message: "Movie was updated successfully.",
                id: id,
                ...movie
            });
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM movies WHERE id = ?", id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error deleting movie with id " + id
            });
        } else if (data.affectedRows == 0) {
            res.status(404).send({
                message: `Movie not found with id ${id}`
            });
        } else {
            res.send({
                message: "Movie was deleted successfully!"
            });
        }
    });
};