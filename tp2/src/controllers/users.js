function createUser(req, res, next) {
  console.log("Cration ...");
  res.send("User créé");
}

module.exports = {
  createUser,
};
