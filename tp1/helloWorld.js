const express = require("express"); // Pour pouvoir importer quelque chose en JS
const app = express();
const port = 3000;

app.get("/", (req, res, next) => {
    res.setDefaultEncoding("Hello worl");
});

app.listen(port, () => {
    console.log('Exemple app listening on port ${port}');
});