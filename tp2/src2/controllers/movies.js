const { insertMovies, insertItem, updateStatus, findWatchList, findFilm, findItem, deleteWatchlist, deleteItem, addFavori, partageWatchlist, ajoutDescription } = require("../services/db/crud"); // insertOne
const {loggerdebug, loggerwarn, loggererror} = require('../log');

// 2 //
// Cette fonction permet d'appeler la fonction insertMovies lorsqu'on se situe sur la bonne URL
async function insertOneMovies(req, res, next) {
  const body = req.body
  try{
    loggerdebug.log("debug", "La fonction insertOneMovies est bien exécuté")
    const result = await insertMovies('movies', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction insertOneMovies : ${e}`)
  }
}

// 4 //
// Cette fonction permet d'appeler la fonction insertItem lorsqu'on se situe sur la bonne URL
async function insertOneItem(req, res, next) {
  const body = req.body
  try{
    loggerdebug.log("debug", "La fonction insertOneItem est bien exécuté")
    const result = await insertItem('watchlist', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction insertOneItem : ${e}`)
  }
}

// 5 //
// Cette fonction permet d'appeler la fonction updatestatus lorsqu'on se situe sur la bonne URL
async function updatestatus(req, res, next) {
  const body = req.body
  try{
    loggerdebug.log("debug", "La fonction updatestatus est bien exécuté")
    const result = await updateStatus('watchlist', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction updatestatus : ${e}`)
  }
}

// 6 //
// Cette fonction permet d'appeler la fonction findItem lorsqu'on se situe sur la bonne URL
async function findItemRegistre(req, res, next) {
  var name = req.query.Title
  // Si la case est vide, alors la variable est égal à "_"
  if(!name){
    loggerwarn.log("warn", "Il manque le nom dans la fonction findItemRegistre")
    name="_";
  }
  try{
    loggerdebug.log("debug", "La fonction findItemRegistre est bien exécuté")
    const result = await findItem('movies', name);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction findItemRegistre : ${e}`)
  }
}

// 8 //
// Cette fonction permet d'appeler la fonction findWatchList lorsqu'on se situe sur la bonne URL
async function findWatchlist(req, res, next) {
  const name = req.query.name
  // Si le nom est absant, on va demander de saisir un nom d'utilisateur
  if(!name){
    loggererror.log("error", "Il n'y a pas de nom utilisateur dans la fonction findWatchList")
    return res.send("<h1>Veuillez saisir un nom d'utilisateur</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
  }
  try{
    loggerdebug.log("debug", "La fonction findWatchlist est bien exécuté")
    const result = await findWatchList('users', name);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction findWatchlist : ${e}`)
  }
}

// 9 //
// Cette fonction permet d'appeler la fonction findFilm lorsqu'on se situe sur la bonne URL
async function findWatchFilm(req, res, next) {
  const name = req.query.id_utilisateur
  if(!name){
    loggererror.log("error", "Il n'y a pas de nom utilisateur dans la fonction findWatchFilm")
    return res.send("<h1>Veuillez saisir un nom de watchList</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
  }
  try{
    loggerdebug.log("debug", "La fonction findWatchFilm est bien exécuté")
    const result = await findFilm('watchlist', name);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction findWatchFilm : ${e}`)
  }
}

// 10 //
// Cette fonction permet d'appeler la fonction deleteItem lorsqu'on se situe sur la bonne URL
async function deleteOneFilm(req, res, next) {
  const body = req.body
  try{
    loggerdebug.log("debug", "La fonction deleteOneFilm est bien exécuté")
    const result = await deleteItem('watchlist', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction deleteOneFilm : ${e}`)
  }
}

// 12 //
// Cette fonction permet d'appeler la fonction deleteWatchlist lorsqu'on se situe sur la bonne URL
async function deleteWatchList(req, res, next) {
  const name = req.body
  // Si la case est vide, on va demander d'insérer le nom d'une watchList
  if(!name.id_utilisateur){
    loggererror.log("error", "Il n'y a pas de nom de watchList dans la fonction deleteWatchList")
    return res.send("<h1>Veuillez choisir une WatchList à supprimer</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
  }
  try{
    loggerdebug.log("debug", "La fonction deleteWatchList est bien exécuté")
    const result = await deleteWatchlist('watchlist', name);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction deleteWatchList : ${e}`)
  }
}

// 13 //
// Cette fonction permet d'appeler la fonction addFavori lorsqu'on se situe sur la bonne URL
async function watchlistFavori(req, res, next) {
  const body = req.body
  try{
    loggerdebug.log("debug", "La fonction watchlistFavori est bien exécuté")
    const result = await addFavori('watchlist', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction watchlistFavori : ${e}`)
  }
}

// 14 //
// Cette fonction permet d'appeler la fonction partageWatchlist lorsqu'on se situe sur la bonne URL
async function partageWatchList(req, res, next) {
  const body = req.body
  try{
    loggerdebug.log("debug", "La fonction partageWatchList est bien exécuté")
    const result = await partageWatchlist('watchlist', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction partageWatchList : ${e}`)
  }
}

// 15 //
// Cette fonction permet d'appeler la fonction ajoutDescription lorsqu'on se situe sur la bonne URL
async function ajoutDescr(req, res, next) {
  const body = req.body;
  try{
    loggerdebug.log("debug", "La fonction ajoutDescr est bien exécuté")
    const result = await ajoutDescription('watchlist', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction ajoutDescr : ${e}`)
  }
}

module.exports = {
  insertOneMovies,
  insertOneItem,
  updatestatus,
  findWatchlist,
  findWatchFilm,
  findItemRegistre,
  deleteWatchList,
  deleteOneFilm,
  watchlistFavori,
  partageWatchList,
  ajoutDescr
};
