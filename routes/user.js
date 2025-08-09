const {Router}=require('express');
const User=require("../models/user")
const {createTokenForUser} = require("../Services/authentication");
const router=Router();

router.get('/signup', (req, res) => {
    res.render('signup', { user: null }); // or undefined, but null is more explicit
});


router.get('/signin', (req, res) => {
    res.render('signin', { user: null });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/user/signin');
});


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.matchPassword(email, password);

        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        const token = createTokenForUser(user);
        res.cookie("token", token, { httpOnly: true });
        console.log("Generated Token:", token);
        res.redirect('/');
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Server Error during login.");
    }
});



router.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).send("Email already registered.");
        }

        const user = await User.create({ fullname, email, password }, { validate: false });
        console.log("User created:", user);
        res.redirect('/');
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).send("Server Error during signup.");
    }
});
module.exports=router;