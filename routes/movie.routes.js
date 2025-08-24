const express = require('express');
const router = express.Router();
const movies = require('../controllers/movie.controller.js');

router.post('/', movies.create);
router.get('/', movies.findAll);
router.get('/:id', movies.findOne);
router.put('/:id', movies.update);
router.delete('/:id', movies.delete);
module.exports = router;