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

// 11 //
// Cette fonction permet d'appeler la fonction findAllUsers lorsqu'on se situe sur la bonne URL
async function updateClient(req, res, next) {
  const nameAncien = req.body;
  nom = nameAncien.nomNouveau;
  year = nameAncien.yearNouveau;
  // S'il n'y a pas de noms ou d'age, la valeur est égal à "_"
  if(!nom)
    nameAncien.nomNouveau = "_";
  if(!year)
    nameAncien.yearNouveau = "_";
  try{
    const result = await updateUsers('users', nameAncien);
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

