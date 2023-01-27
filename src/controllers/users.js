const { findOne, find, insertOne, insertMany, updateOne, updateMany, replace, deleteOne, deleteMany } = require("../services/db/crud"); // insertOne
// const userSchema = require("../shemas/users");
// const { validateSchema } = require("../services/validateSchema") 

function createUser(req, res, next) {
  console.log("Cration ...");
  res.send("User créé");
}

async function findUser(req, res, next){
  try{
    const result = await findOne('users', {name: 'toto'});
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function findAllUser(req, res, next){
  try{
    const result = await find('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insertUser(req, res, next){
  try{
    const result = await insertOne('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function insertManyUser(req, res, next){
  try{
    const result = await insertMany('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function updateUser(req, res, next){
  try{
    const result = await updateOne('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function updateManyUser(req, res, next){
  try{
    const result = await updateMany('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function replaceUser(req, res, next){
  try{
    const result = await replace('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function deleteUser(req, res, next){
  try{
    const result = await deleteOne('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

async function deleteManyUser(req, res, next){
  try{
    const result = await deleteMany('users');
    return res.send(result);
  }catch(e){
    console.log(e);
  }
}

module.exports = {
  createUser,
  findUser,
  findAllUser,
  insertUser,
  insertManyUser,
  updateUser,
  updateManyUser,
  replaceUser,
  deleteUser,
  deleteManyUser
};

