import express from 'express';

const router = express.Router();

router.get('/signin', async function GetSignInPage(req, res) {
    res.render('signIn.ejs');
});

router.get('/signup', async function GetSignUpPage(req, res) {
    res.render('signUp.ejs');
});

router.get('/home', async function GetHomePage(req, res) {
    res.render('home.ejs');
});

export default router;