import { Router } from "express";
import movieService from "../services/movie-service.js";

const movieController = Router();

movieController.get('/search', (req, res) => {
    res.render('search');
})

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    console.log('POST MOVIE');
    
    const newMovie = req.body;
    movieService.create(newMovie);

    res.redirect('/');
    
})

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    
    //Get movie data from movieId
    const movie = movieService.findOne(movieId);
    
    res.render('details', { movie });
});

export default movieController;