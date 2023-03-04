const express = require('express');
const app = express();
const users = require('./users');
const movies = require('./movies');

// const metrics = {
//     requestsCount: {},
// };

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");

app.use(express.json());

// app.use((req, res, next) => {
//     const currentUrlRequestsCount = metrics.requestsCount[req.url];
//     metrics.requestsCount[req.url] = currentUrlRequestsCount
//         ? currentUrlRequestsCount + 1
//         : 1;
//     return next();
// });

// app.use((req, res, next) => {
//     console.log(req.url);
//     return next();
// });

app.use('/users', users);

app.use('/movies', movies);

app.get('/', (req, res, next) => {
    res.render("home", {
        title: "Gestionnaire de watchlist",
        message: "Hello World!",
    });
});

app.get('/users', (req, res, next) => {
    res.render("user", {
        title: "Gestionnaire des users",
        message: "Hello Users!",
      });
});

app.get('/movies', (req, res, next) => {
    res.render("movies", {
        title: "Gestionnaire des movies et des watchlist",
        message: "Hello Watchlist & Movies!",
    });
});

// app.get('/health', (req, res, next) => {
//     return res.status(200).json({ status: 'healthy' });
// });

// app.get('/metrics', (req, res, next) => {
//     metrics.uptime = `${process.uptime().toFixed(2)} seconds`;
//     return res.json(metrics);
// });

module.exports = app