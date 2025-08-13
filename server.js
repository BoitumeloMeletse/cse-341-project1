const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

// Middleware setup
app
  .use(bodyParser.json())
  .use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ 
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: ['https://cse-341-project1-0cop.onrender.com']
  }))
  .use("/", require('./routes'));

// GitHub OAuth Configuration
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // Replace 'YourGitHubUsername' with your actual GitHub username
    const isAdmin = profile.username === 'YourGitHubUsername';
    
    const user = {
      displayName: profile.displayName || profile.username,
      username: profile.username,
      githubId: profile.id,
      role: isAdmin ? 'admin' : 'user',
      avatar: profile.photos[0].value
    };
    
    return done(null, user);
  }
));

// Session serialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined 
    ? `Logged in as ${req.session.user.displayName} (Role: ${req.session.user.role})`
    : "Logged out");
});

// GitHub callback route
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Current user endpoint
app.get('/current-user', (req, res) => {
  if (req.session.user) {
    res.json({
      username: req.session.user.username,
      displayName: req.session.user.displayName,
      role: req.session.user.role,
      isAdmin: req.session.user.role === 'admin',
      avatar: req.session.user.avatar
    });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

// Database connection
mongodb.initDB((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log('Database connection established.');
      console.log(`Running on port ${port}`);
    });
  }
});