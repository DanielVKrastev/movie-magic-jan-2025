import Movie from "../models/Movie.js";

export default {
    getOne(movieId) {
        const result = Movie.findById(movieId);

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
    getAll(filter = {}){

        let query = Movie.find({}) // .lean() Second solution: https://mongoosejs.com/docs/api/query.html#Query.prototype.lean()

        if(filter.search){
            // TODO: Fix partrial case insensitive search
            query = query.find({title: filter.search})
        }

        if(filter.genre){
            // TODO: Add case insensitive search
            query = query.find({genre: filter.genre})
        }

        if(filter.year){
            query = query.find({year: Number(filter.year)});
        }
        
        return query;
    }
}