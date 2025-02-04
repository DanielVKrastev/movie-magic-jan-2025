import { Schema, model, Types } from 'mongoose';

// Create Schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'], //custom message for error
        minLength: [5, 'Title should be at least 5 characters long!'],
        maxLength: 250,
        match: [/[A-Za-z 0-9]+$/, 'Title should be alphanumeric, digits and whitespaces only!'],
    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required!'], //custom message for error
        minLength: [5, 'Genre should be at least 5 characters long!'],
        maxLength: 250,
        match: [/[A-Za-z 0-9]+$/, 'Genre should be alphanumeric, digits and whitespaces only!'],
    },
    director: {
        type: String,
        minLength: [5, 'Director should be at least 5 characters long!'],
        maxLength: 250,
        match: [/[A-Za-z 0-9]+$/, 'Director should be alphanumeric, digits and whitespaces only!'],
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025,
    },
    imageUrl: {
        type: String,
        match: /https?:\/\//,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        minLength: 20,
        match: [/[A-Za-z 0-9]+$/, 'Description should be alphanumeric, digits and whitespaces only!'],
    },
    casts: [{               // Relationships to Cast
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    // casts: [{
    //     character: String,
    //     cast: {
    //         type: Types.ObjectId,
    //         ref: 'Cast'
    //     },
    // }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    },
});

// Create model
const Movie = model('Movie', movieSchema);

// Export model Movie
export default Movie;