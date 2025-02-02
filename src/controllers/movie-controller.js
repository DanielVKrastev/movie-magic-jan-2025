import { Router } from "express";
import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);
    res.render('search', { movies, filter });
})

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
   //console.log('POST MOVIE');
    const userId = req.user?.id;
    const newMovie = req.body;

    await movieService.create(newMovie, userId);

    res.redirect('/');
    
})

movieController.get('/:movieId/details', async (req, res) => {
    console.log(req.user);
    
    const movieId = req.params.movieId;
    
    //Get movie data from movieId
    const movie = await movieService.getOneWithCast(movieId);
    //const casts = await castService.getAll()
    
    res.render('movie/details', { movie });
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    //Get movie data from movieId
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({exclude: movie.casts}); //filter without added ids

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    //console.log(req.body);
    const castId = req.body.cast;
    //const character = req.body.character;
    const movieId = req.params.movieId; 
    await movieService.attachCast(movieId, castId)

    res.redirect(`/movies/${movieId}/details`);
});


export default movieController;