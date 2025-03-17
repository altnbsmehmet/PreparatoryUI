import express from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/signin', async function SignIn(req, res) {
    const response = (await axios.post('http://localhost:6410/api/user/signin', req.body, { withCredentials: true })).data;
    if (response.isSuccess == false) return res.redirect('/page/signin');
    res.redirect('/page/home');
});

router.post('/signup', async function SignUp(req, res) {
    const result = await axios.post('http://localhost:6410/api/user/signup', req.body);
    console.log(`\nResponse --> ${JSON.stringify(result.data)}\n`);
    res.render('signUp.ejs', { result: result.data });
});

router.get('/signout', async function SignOut(req, res) {

    res.render('signIn.ejs');
});

export default router