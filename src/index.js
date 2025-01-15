import express from 'express';
import handlebars from 'express-handlebars';
import homeController from './controllers/home-controller.js';

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}))
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public')); // /static/css/style.css

app.use(homeController);

app.get('*', (req, res) => {
    res.render('404');
})


app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
