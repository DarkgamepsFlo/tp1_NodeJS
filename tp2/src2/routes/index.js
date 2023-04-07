const express = require('express');
const { loggerdebug } = require('../log');
const app = express();
const users = require('./users');
const movies = require('./movies');

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");

app.use(express.json());

app.use('/users', users);

app.use('/movies', movies);

// Lien qui nous mène sur le Menu principal
app.get('/', (req, res, next) => {
    loggerdebug.log("debug", "Je suis dans le menu de mon API")
    res.render("home", {
        title: "Gestionnaire de watchlist",
        message: "Hello World!",
    });
});

// Lien qui nous mène sur la page de la gestion d'Users
app.get('/users', (req, res, next) => {
    loggerdebug.log("debug", "Je suis dans le menu des users")
    res.render("user", {
        title: "Gestionnaire des users",
        message: "Hello Users!",
      });
});

// Lien qui nous mène sur la page de la gestion de Movies
app.get('/movies', (req, res, next) => {
    loggerdebug.log("debug", "Je suis dans le menu des movies")
    res.render("movies", {
        title: "Gestionnaire des movies et des watchlist",
        message: "Hello Watchlist & Movies!",
    });
});

module.exports = app