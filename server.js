const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session'); 
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const part = process.env.Post || 3000;
const app = express(); 

app
   .use(bodyParser.json());
   app.use(session({
     secret: "secret",
     resave: false,
     saveUninitialized: true,
    }))
    // this is the basic express session({..}) initialization
   .use(passport.initialize())
   // init passport on every route call,
    .use(passport.session())
    // allow passport to use "express-session"
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.setHeader(
            "Access-Control-Allow-Methods",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH' ]}))
    .use(cors({ origin: '*'}))
    .use("/", require('./routes/index.js'));



    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        const user = {
            displayName: "Boitumelo Meletse" // << force custom name
          };
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, user);
        //});
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Logged out")});

app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}), 
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDB((err) => {
    if (err) {
        console.error(err);
    }
    else {
        app.listen(part, () => {
            console.log('Database connection established.');
            console.log(`Running on part ${part}`)});
    }

});