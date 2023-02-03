const { insertOne } = require("../services/db/crud"); // insertOne


async function createUser(req, res, next) {
  const pseudo = req.query.pseudo;
  const age = req.query.age;
  if((!pseudo) || (!age))
    res.send("Veuillez sélectionner un pseudo et saisir votre age sous la forme : 'create/?pseudo=[Votre_pseudo]&age=[Votre_age]'");
  else{
    try{
      const result = await insertOne('users', {name: pseudo, age: age});
      return res.send(result);
    }catch(e){
      console.log(e);
    }
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
  createUser
};

