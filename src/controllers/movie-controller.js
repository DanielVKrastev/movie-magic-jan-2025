import { Router } from "express";
import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";
import { isAuth } from "../moddilewares/auth-middleware.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);
    res.render('search', { movies, filter });
})

movieController.get('/create', isAuth, (req, res) => {
    res.render('create');
});

movieController.post('/create', isAuth, async (req, res) => {
   //console.log('POST MOVIE');
    const userId = req.user?.id;
    const newMovie = req.body;

    await movieService.create(newMovie, userId);

    res.redirect('/');
    
})

movieController.get('/:movieId/details', async (req, res) => {
    //console.log(req.user);
    
    const movieId = req.params.movieId;
    
    //Get movie data from movieId
    const movie = await movieService.getOneWithCast(movieId);
    //const casts = await castService.getAll()

    const isCreator = movie.creator && movie.creator.toString() === req.user?.id; //creator? if have creator
    
    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    //Get movie data from movieId
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({exclude: movie.casts}); //filter without added ids

    res.render('movie/attach-cast', { movie, casts});
});

movieController.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    //console.log(req.body);
    const castId = req.body.cast;
    //const character = req.body.character;
    const movieId = req.params.movieId; 
    await movieService.attachCast(movieId, castId)

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    
    if(!movie.creator?.equals(req.user?.id)){
        return redirect('/404');
    }

   await movieService.delete(movieId)

   res.redirect('/');
});

function getCategoriesViewData(category){
    let categoriesMap = {
        "tv-show" :'TV Show',
        "animation" :'Animation',
        "movie" :'Movie',
        "documentary" :'Documentary',
        "short-film" :'Short Film',
        }; 

    const categories = Object.keys(categoriesMap).map(value => ({
        value,
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }));

    return categories;
}

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    const categories = getCategoriesViewData(movie.category);

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    // TODO: Check if creator

    await movieService.update(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);

});

export default movieController;