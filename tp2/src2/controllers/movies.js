const { insertMovies, insertItem } = require("../services/db/crud"); // insertOne

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
  insertOneItem
};