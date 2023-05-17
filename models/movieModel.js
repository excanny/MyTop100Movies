const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title : { type: String, required: true},
    genre: { type: String, required: true},
    release_year: { type: String, required: true},
    score:{type: Number, required: true}
    
  },
  { timestamps: true }
  );

module.exports = mongoose.model("movies", movieSchema);