const express = require('express');
const router = express.Router();
const movies = require('../controllers/movie.controller.js');

router.post('/', movies.create);
router.get('/', movies.findAll);
router.get('/:id', movies.findOne);

module.exports = router;