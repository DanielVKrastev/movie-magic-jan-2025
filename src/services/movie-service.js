import movies from "../movies.js";

export default {
    findOne(movieId) {
    //TODO: If movie is missing?

    const result = movies.find(movie => movie.id === movieId);

    return result;
    }
}