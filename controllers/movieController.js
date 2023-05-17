const Movie = require('../models/movieModel');
const Joi = require('joi');
const jwt_decode = require('jwt-decode');

const createMovie = (req, res) => {
    
    const { title, genre, release_year, score} = req.body

    const newMovie = new Movie({
      title, genre, release_year, score
    })

    newMovie.save((err, data)=>{
        if(err) return res.json({Error: err});
        return res.status(201).json({status: true, message: "Movie created successfully"});
       
    }) 
   
};

const getAllMovies = (req, res) => {
    Movie.find({}, (err, data) => {
      if (err) {
        return res.json({status: false, message: "Error occured. Try again"});
      }
      return res.json(data);
    }).sort({'score': -1});
  };


const getMovie = (req, res) => {
    let {id} = req.params;
    Movie.findOne({ _id: id }, (err, data) => {
      if (err || !data) {
        return res.json({status: false, message: `No movie with this id: ${id}`});
      } else return res.json(data);
    });
  };


const updateMovie = (req, res) => {

  let {id} = req.params;
  Movie.findByIdAndUpdate(id, {$set:{title: req.body.title, genre: req.body.genre, 
    release_year: req.body.release_year, score: req.body.score}}, {new:true})  
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`
        });
      } else res.send({ message: "Movie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id
      });
    });
}

const deleteMovie = (req, res) => {
    let {id} = req.params;
    
        if (!String(id).trim()) return res.status(400).json({status: false, message: "movieId field is required"});

        Movie.deleteOne({ _id: id }, (err, data) => {
        if (data.deletedCount == 0) return res.json({status: false, message: `No movie with such id: ${id}`});
        else if (err) return res.json({status: false, message: `Error occured. Try again. ${err}`});
        else return res.json({status: true, message: `Movie with id:${id} deleted successfully`});
        });
  };
  

module.exports = {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie
  };