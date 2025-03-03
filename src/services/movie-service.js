import Movie from "../models/Movie.js";

export default {
    getOne(movieId) {
        const result = Movie.findById(movieId);

        return result;
    },
    getOneWithCast(movieId) {
        return this.getOne(movieId).populate('casts'); // add .populate() -> full cast in casts row
    },
    create(movieData, creatorId) {
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        });

        return result;
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
    },
    async attachCast(movieId, castId, character){
        // TODO: Check if castId is not added already 

        // First way to attach
        /*
        const movie = await Movie.findById(movieId);

        if(movie.casts.includes(castId)){
            return;
        }

        movie.casts.push(castId);
        await movie.save();

        return movie;
        */

        // Second way to attach
        return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}}); //method with mongoDB
        // return Movie.findByIdAndUpdate(movieId, {
        //     $push: {
        //         casts: {
        //              cast: castId,
        //              character
        //             }
        //     }
        // }); //method with mongoDB
    },
    delete(movieId){
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData){
        return Movie.findByIdAndUpdate(movieId, movieData);
    },
}