const express = require('express')
const app = express()
const port = 3000

// 8
// app.use("/", (req, res) => {
//     console.log(new Date().toJSON() + " " + req.url);
// })

// 10

const metrics = {
    requestCount : {},
    status : "healthy", // Route qui vont permettre de tester si l'appli est en ligne ou non
};

app.get('/metrics', (req, res, next) => {
    metrics.uptime = '${process.uptime().toFixed(2)} seconds';
    return res.json(metrics)
})

app.use((req, res, next) => {
    const currentUrlRequestCount = metrics.requestCount[req.url];
    metrics.requestCount[req.url] = currentUrlRequestCount
        ? currentUrlRequestCount + 1 // Si on l'appelle pour la première fois, on initialise à 1
        : 1; // Sinon on ajoute 1
    return next(); // return : S'assurer que la fonction ne continu pas après
});

// 0
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 1
app.get('/welcome', (req, res) => {
    res.send('Bienvenue sur le TP 1 du cours d architecture logiciel');
})

// 2
app.get('/secret', (req, res) => {
    res.status(401).send("Vous ne possédez pas les droits pour accéder à ma page secrète");
})

// 3
app.get('/error', (req, res) => {
    res.status(500).json({message : 'message'});
})

// 4
app.get('/img', (req, res) => {
    res.download("./Ramm.png");
})

// 5
app.get('/redirectMe', (req, res) => {
    res.redirect("http://extra.univ-littoral.fr/");
})

// 6
app.get('/users/:name', (req, res) => {
    res.send("Bienvenue sur la page de " + req.params.name)
})
  
// 7
app.get('/somme', function (req, res, next) {
    const a = Number(req.query.a)
    const b = Number(req.query.b)
    const result = a + b
    res.send(a + " + " + b + " = " + result)
    next()
})

// 9
app.use((req, res) => {
    res.status(404).setDefaultEncoding("Cette Page n'existe pas");
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})