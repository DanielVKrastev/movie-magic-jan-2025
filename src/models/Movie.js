import { Schema, model } from 'mongoose';

// Create Schema
const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String,
});

// Create model
const Movie = model('Movie', movieSchema);

// Export model Movie
export default Movie;