import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config'; //npm i dotenv

import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';

const app = express();

// DB Configuration
try{
    const localUri = 'mongodb://127.0.0.1:27017/magic-movies-jan2025';
    console.log(process.env.DATABASE_URI);
    
    await mongoose.connect(process.env.DATABASE_URI ?? localUri);

    console.log('DB Connected Successfuly!');
    
}catch(err){
    console.log('Cannot DB Connect');
    console.error(err.message);
}


// Handlerbars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Third solution !!!!!
    },
    helpers: {
        showRating: showRatingHelper,
    }
}))
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Exoress conf
app.use('/static', express.static('src/public')); // /static/css/style.css
app.use(express.urlencoded({extended: false})); // Learn express to parse form dataa
app.use(cookieParser());

app.use(routes);


app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
