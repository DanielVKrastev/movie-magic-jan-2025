import { Router } from "express";
import authService from "../services/auth-service.js";
import { getErrorMessage } from "../utils/error-utils.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { pageTitle: 'Register'})
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try{
        await authService.register(userData);
    }catch(err){
        // Log the error
        console.log(getErrorMessage(err));
        const error = getErrorMessage(err);

        //Return to register page and show error on the page
        return res.render('auth/register', { error });

        //return res.redirect('/auth/register');

    }

    res.redirect('/auth/login');
    
});

authController.get('/login', (req, res) => {
    res.render('auth/login', { pageTitle: 'Login'});
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try{
        const token = await authService.login(email, password);
        
        res.cookie('auth', token, {
            httpOnly: true,
        });
        return res.redirect('/');
    }catch(err){
        console.log(err.message);
        return res.redirect('/404');
    }

});

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});


export default authController;