const {  } = require("../services/db/crud"); // insertOne


function createMovies(req, res, next) {
  console.log("Cration ...");
  res.send("Movies créé");
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

};