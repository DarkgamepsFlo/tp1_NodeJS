const { insertClient, createWatchList, findUsers, updateUsers } = require("../services/db/crud");
const {loggerdebug, loggerwarn, loggererror} = require('../log');

// 1 //
// Cette fonction permet d'appeler la fonction insertClient lorsqu'on se situe sur la bonne URL
async function createUser(req, res, next) {
  const body = req.body;
  try{
    loggerdebug.log("debug", "La fonction createUser est bien exécuté")
    const result = await insertClient('users', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction createUser : ${e}`)
  }
}

// 3 //
// Cette fonction permet d'appeler la fonction createWatchList lorsqu'on se situe sur la bonne URL
async function createWatchlist(req, res, next) {
  const body = req.body;
  try{
    loggerdebug.log("debug", "La fonction createWatchlist est bien exécuté")
    const result = await createWatchList('users', body);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction createWatchlist : ${e}`)
  }
}

// 7 //
// Cette fonction permet d'appeler la fonction findAllUsers lorsqu'on se situe sur la bonne URL
async function findAllUsers(req, res, next) {
  try{
    loggerdebug.log("debug", "La fonction findAllUsers est bien exécuté")
    const result = await findUsers('users');
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction findAllUsers : ${e}`)
  }
}

// 11 //
// Cette fonction permet d'appeler la fonction updateUser lorsqu'on se situe sur la bonne URL
async function updateClient(req, res, next) {
  const nameAncien = req.body;
  nom = nameAncien.nomNouveau;
  year = nameAncien.yearNouveau;
  // S'il n'y a pas de noms ou d'age, la valeur est égal à "_"
  if(!nom){
    nameAncien.nomNouveau = "_";
    loggerwarn.log("warn", "Il manque le nom dans la fonction updateClient");
  } 
  if(!year){
    nameAncien.yearNouveau = "_";
    loggerwarn.log("warn", "Il manque l'age' dans la fonction updateClient");
  }
  try{
    loggerdebug.log("debug", "La fonction updateClient est bien exécuté")
    const result = await updateUsers('users', nameAncien);
    return res.send(result);
  }catch(e){
    loggererror.log("error", `Il y a une erreur dans la fonction updateClient : ${e}`)
  }
}

module.exports = {
  createUser,
  createWatchlist,
  findAllUsers,
  updateClient,
};

