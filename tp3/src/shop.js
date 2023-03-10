/**
 * @function
 * @param {number} id, id de l'utilisateur a rechercher
 * @param {Array} usersData, tableau contenant la liste des utilisateurs 
 * Retourne les données de l'utilisateur de la liste qui correpondant à l'id 
 */
function getUser(id, usersData) {
  var longueurTab = usersData.length;
  if (typeof(id) == typeof("toto"))
    throw ("L'identifiant doit être un entier positif");
  if (typeof(usersData) != typeof([]))
    throw new Error ("La liste des utilisateur doit être un tableau contenant des utilisateurs");
  if (usersData.length == 0)
    throw new Error ("La liste des utilisateur est vide");
  if (id > longueurTab)
    throw new Error ("L'utilisateur " + id + " n'existe pas!");
  if (id < 0)
    throw new Error ("L'identifiant doit être un entier positif");
  else
    return usersData[id - 1];
}

module.exports = {
  getUser,
};
