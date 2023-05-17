const express = require ('express');
const router  = express.Router(); 

const movieController = require('../controllers/movieController'); 

router.post('/movies/',  movieController.createMovie);
router.get('/movies/',  movieController.getAllMovies);
router.get('/movies/:id',  movieController.getMovie);
router.put('/movies/:id',  movieController.updateMovie);
router.delete('/movies/:id',  movieController.deleteMovie);


module.exports = router;
