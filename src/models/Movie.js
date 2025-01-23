import { Schema, model, Types } from 'mongoose';

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
    casts: [{               // Relationships to Cast
        type: Types.ObjectId,
        ref: 'Cast'
    }],
});

// Create model
const Movie = model('Movie', movieSchema);

// Export model Movie
export default Movie;