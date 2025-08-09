const express = require("express");
const path = require("path");
const sequelize = require('./config/db');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const cookieParser=require('cookie-parser');
const Blog = require('./models/blog');
const User = require('./models/user');
// const { requireAuth }=require('./Middleware/authmiddleware');
const {requireAuth} = require('./Middleware/authmiddleware');
const {validateToken} = require('./Services/authentication');
const app = express();
const PORT = 8000;
// Set EJS as view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(cookieParser());

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    const token = req.cookies?.token;

    if (token) {
        try {
            const user = validateToken(token);
            req.user = user;
            res.locals.user = user; // available to all views (like nav.ejs)
        } catch (err) {
            req.user = null;
            res.locals.user = null;
        }
    } else {
        req.user = null;
        res.locals.user = null;
    }

    next(); 
});

// Routes
app.use('/user', userRoute);
app.use('/blog',blogRoute);


app.get('/', requireAuth, async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [{ model: User, as: 'created', attributes: ['fullname', 'profileImageURL'] }]
        });

        res.render('home', { user: req.user, blogs });
    } catch (err) {
        console.error('Error loading blogs:', err);
        res.status(500).send('Error loading homepage.');
    }
});

// Sync database and start server
sequelize.sync()
    .then(() => {
        console.log('MySQL DB connected and tables synced');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
    });
