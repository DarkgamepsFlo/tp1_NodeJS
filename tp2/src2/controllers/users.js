const { insertClient, createWatchList } = require("../services/db/crud");

async function createUser(req, res, next) {
  const body = req.body;
  try{
    const result = await insertClient('users', body);
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function createWatchlist(req, res, next) {
  const body = req.body;
  try{
    const result = await createWatchList('users', body);
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
  createWatchlist
};

