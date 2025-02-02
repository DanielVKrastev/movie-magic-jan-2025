import { Router } from 'express';
import movieService from '../services/movie-service.js';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await movieService.getAll(); // *.lean() Second solution: https://mongoosejs.com/docs/api/query.html#Query.prototype.lean() !!!!!!

    // *Convert documents to plain objects. First solution !!!!!!!
    //const plainMovies = movies.map(m => m.toObject());

    // *Third solution is to use allowProtoPropertyByDefault in hanlebars
    res.render('home', { movies: movies });
})

router.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About'});
})

export default router;