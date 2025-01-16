import { v4 as uuid } from "uuid";
import movies from "../movies.js";

export default {
    findOne(movieId) {
    //TODO: If movie is missing?

    const result = movies.find(movie => movie.id === movieId);

    return result;
    },
    create(movieData) {
        // TODO: add IDs
        const newId = uuid();

        movies.push({
            id: newId,
            ...movieData,
            rating: Number(movieData.rating),
        });

        return newId;
    },
    getAll(){
        return movies;
    }
}