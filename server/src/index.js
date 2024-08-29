const express = require("express");
const cors = require('cors');
const session = require('express-session');
const expbs = require('express-handlebars');

// routers
const profileRoute = require('../routes/profile');
const uploadRoute = require('../routes/upload');
const userRoute = require('../routes/user');

const app = express();

//env files
require("dotenv").config();

// template (handlebars)
var hbs = require("hbs");

// for pathing
const path = require("path");
const thesisCollection = require("./thesisdb");

var templatePath = path.join(__dirname,'../templates');

// storing sessions
const store = new session.MemoryStore();

// for sessions
app.use(session({
    secret: 'IT56secret',
    resave: true,
    cookie: { maxAge: 60000 * (60*24) },
    saveUninitialized: false,
    store
}));

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));



// front end and layout (handlebars)
app.set("views", templatePath);
app.set('view engine', 'hbs');
app.engine('handlebars', expbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'templates/layouts')
    }));



//static files
app.use((req, res, next) => {
    // remove comment to see where is store
    // console.log(store);

    //remove comment to see what type of req happenning
    // console.log(`${req.method} - ${req.url}`);
    next();
});

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Routes
app.use(profileRoute);
app.use(uploadRoute);
app.use(userRoute);

// PAGES IN WEBSITE
app.get('/index', (req, res) => {
    res.render('index', { title: 'Index'});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

// index page
app.get("/",(req,res)=>{
    res.render("landingPage")
})

app.listen(5000, ()=>{
    console.log("port connected");
})

app.get('/search/:key', async (req, res) => {
    console.log(req.params.key);
    let data = await thesisCollection.find(
        {
            "$or": [
                {filename: {$regex: req.params.key}},
                {brand: {$regex: req.params.key}},
                {category: {$regex: req.params.key}},
            ]
        }
    );
    res.send(data);
});

module.exports = app; 