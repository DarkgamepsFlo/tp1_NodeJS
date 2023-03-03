const { insertMovies, insertItem, updateStatus, findWatchList, findFilm, findItem, deleteWatchlist, deleteItem, addFavori, partageWatchlist, ajoutDescription } = require("../services/db/crud"); // insertOne

async function insertOneMovies(req, res, next) {
  const body = req.body
  try{
    const result = await insertMovies('movies', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function insertOneItem(req, res, next) {
  const body = req.body
  try{
    const result = await insertItem('watchlist', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function updatestatus(req, res, next) {
  const body = req.body
  try{
    const result = await updateStatus('watchlist', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function findWatchlist(req, res, next) {
  const name = req.query.name
  if(!name)
  return res.send("Veuillez saisir un numéro d'utilisateur");
  try{
    const result = await findWatchList('users', name);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function findWatchFilm(req, res, next) {
  const name = req.query.id_utilisateur
  if(!name)
  return res.send("Veuillez saisir un nom de watchList");
  try{
    const result = await findFilm('watchlist', name);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function findItemRegistre(req, res, next) {
  const name = req.query.Title
  if(!name)
  return res.send("Veuillez saisir un filtre");
  try{
    const result = await findItem('movies', name);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function deleteWatchList(req, res, next) {
  const name = req.query.nom
  if(!name)
  return res.send("Veuillez choisir une WatchList à supprimer");
  try{
    const result = await deleteWatchlist('watchlist', name);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function deleteOneFilm(req, res, next) {
  const body = req.body
  try{
    const result = await deleteItem('watchlist', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function watchlistFavori(req, res, next) {
  const body = req.body
  try{
    const result = await addFavori('watchlist', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function partageWatchList(req, res, next) {
  const body = req.body
  try{
    const result = await partageWatchlist('watchlist', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function ajoutDescr(req, res, next) {
  const body = req.body
  try{
    const result = await ajoutDescription('watchlist', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

// Exemple ///////////////////////////////////////////////////////////
// async function findUser(req, res, next){
//   try{
//     const result = await findOne('users', {name: 'toto'});
//     return res.send(result);
//   }catch(e){
//     console.log(e);
//   }
// }

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
