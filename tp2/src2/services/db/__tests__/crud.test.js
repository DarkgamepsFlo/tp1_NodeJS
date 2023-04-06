const {insertClient, createWatchList, insertItem, updateStatus, addFavori} = require("../crud");

const insertClientGood = require("../__mocks__/insertClientGood.json");
const insertClientNotName = require("../__mocks__/insertClientNotName.json");
const insertClientBadName = require("../__mocks__/insertClientBadName.json");
const insertClientBadAge = require("../__mocks__/insertClientBadAge.json");
const createWatchListGood = require("../__mocks__/createWatchListGood.json");
const createWatchListNotName = require("../__mocks__/createWatchListNotName.json");
const createWatchListBadName = require("../__mocks__/createWatchListNotName.json");
const insertItemGood = require("../__mocks__/insertItemGood.json");
const insertItemBadFilm = require("../__mocks__/insertItemBadFilm.json");
const insertItembadWatchList = require("../__mocks__/insertItemBadWatchList.json");
const updateStatusGood = require("../__mocks__/updateStatusGood.json");
const updateStatusBadFilm = require("../__mocks__/updateStatusBadFilm.json");
const updateStatusBadWatchList = require("../__mocks__/updateStatusBadWatchList");
const addFavoriGood = require("../__mocks__/addFavorieGood.json");
const addFavoriBadWatch = require("../__mocks__/addFavorieBadWatch.json");


describe("Test de certaines fonctions dans crud.js", () => {
    describe("Test de la fonction insertClient", () => {
        it("Le client est bien inséré", async () => {
            const insert = await insertClient('users', insertClientGood);
            expect(insert).toBe("<h1>L'utilisateur est bien enregistré dans la base de données</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>");
        })
        it("Il n'y a pas l'attribut name", async () => {
            const insert = await insertClient('users', insertClientNotName);
            expect(insert).toBe("<h1>Veuillez renseigner l'ensemble des informations nécessaire</h1><p>Pour retourner au menu prédédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>");
        })
        it("Il n'y a pas de nom", async () => {
            const insert = await insertClient('users', insertClientBadName);
            expect(insert).toBe("<h1>Veuillez renseigner l'ensemble des informations nécessaire</h1><p>Pour retourner au menu prédédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>");
        })
        it("Il n'y a pas d'age", async () => {
            const insert = await insertClient('users', insertClientBadAge);
            expect(insert).toBe("<h1>Veuillez renseigner l'ensemble des informations nécessaire</h1><p>Pour retourner au menu prédédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>");
        })
    })
    describe("Test de la fonction createwatchlist", () => {
        it("La watchList est bien inséré", async () => {
            const create = await createWatchList('users', createWatchListGood);
            expect(create).toBe("<h1>La watchList est bien ajouté à l'utilisateur</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>")
        })
        it("La watchList n'a pas l'attribut name", async () => {
            const create = await createWatchList('users', createWatchListNotName);
            expect(create).toBe("<h1>Veuillez renseigner le nom de l'utilisateur</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>")
        })
        it("La watchList n'a pas de nom", async () => {
            const create = await createWatchList('users', createWatchListBadName);
            expect(create).toBe("<h1>Veuillez renseigner le nom de l'utilisateur</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>")
        })
    })
    describe("Test de la fonction insertItem", () => {
        it("Le film est bien inséré dans la watchList", async () => {
            const create = await insertItem('watchlist', insertItemGood);
            expect(create).toBe("<h1>Le film est bien inséré dans la Watchlist</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>")
        })
        it("Il n'y a pas de nom de film", async () => {
            const create = await insertItem('watchlist', insertItemBadFilm);
            expect(create).toBe("<h1>Veuillez renseigner les informations pour pouvoir insérer un film</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>")
        })
        it("Il n'y a pas de nom de watchList", async () => {
            const create = await insertItem('watchlist', insertItembadWatchList);
            expect(create).toBe("<h1>Veuillez renseigner les informations pour pouvoir insérer un film</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>")
        })
    })
    describe("Test de la fonction updateStatus", () => {
        it("Le status du film est bien modifé", async () => {
            const update = await updateStatus('watchlist', updateStatusGood);
            expect(update).toBe("<h1>Le status est bien modifié</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>");
        })
        it("Il n'y a pas la watchList", async () => {
            const update = await updateStatus('watchlist', updateStatusBadWatchList);
            expect(update).toBe("<h1>Veuillez renseigner les informations pour pouvoir changer le status du film</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
        })
        it("Il n'y a pas le film", async () => {
            const update = await updateStatus('watchlist', updateStatusBadFilm);
            expect(update).toBe("<h1>Veuillez renseigner les informations pour pouvoir changer le status du film</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
        })
    })
    describe("Test de la fonction addFavorie", () => {
        it("La watchList est bien en favorie", async () => {
            const addfav = await addFavori('watchlist', addFavoriGood);
            expect(addfav).toBe("<h1>La watchList est bien en favori</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>")
        })
        it("Il n'y a pas le nom de la watchList", async () => {
            const addfav = await addFavori('watchlist', addFavoriBadWatch);
            expect(addfav).toBe("<h1>Veuillez préciser la watchList à mettre en favori</h1><p>Pour choisir des paramètre de mdifiation : <a href='http://localhost:3000/movies'>Page précédente</a></p>")
        })
    })
})