const { insertClient, createWatchList, findUsers, updateUsers } = require("../services/db/crud");

// 1 //
// Cette fonction permet d'appeler la fonction insertClient lorsqu'on se situe sur la bonne URL
async function createUser(req, res, next) {
  const body = req.body;
  try{
    const result = await insertClient('users', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

// 3 //
// Cette fonction permet d'appeler la fonction createWatchList lorsqu'on se situe sur la bonne URL
async function createWatchlist(req, res, next) {
  const body = req.body;
  try{
    const result = await createWatchList('users', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

// 7 //
// Cette fonction permet d'appeler la fonction findAllUsers lorsqu'on se situe sur la bonne URL
async function findAllUsers(req, res, next) {
  try{
    const result = await findUsers('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function updateClient(req, res, next) {
  const nameAncien = req.query.nomA;
  nom = req.query.nomN;
  year = req.query.age;
  if(!nom)
    nom = "_";
  if(!year)
    year = "_";
  try{
    const result = await updateUsers('users', nameAncien, nom, year);
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
  createUser,
  createWatchlist,
  findAllUsers,
  updateClient,
};

