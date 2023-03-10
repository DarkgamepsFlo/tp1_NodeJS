const productsData = require("./products.json");
const paniersData = require("./paniers.json");
const usersData = require("./users.json");
const _ = require("lodash");

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

/**
 * @function 
 * @param {List} usersData Liste d'utilisateurs
 * @returns Return l'ensemble des numéros de téléphone de l'ensemble des personnes ayant plus de 50 ans
 */
function getNumero(usersData){
  var listNum = [];
  if (typeof(usersData) != typeof([]))
    throw new Error ("La liste des utilisateur doit être un tableau contenant des utilisateurs");
  if (usersData.length == 0)
    throw new Error ("La liste des utilisateur est vide");
  for(var i = 0; i < usersData.length; i++){
    if(typeof(usersData[i].age) == typeof("lol"))
      throw new Error ("L'age est un string");
    if(usersData[i].age >= 50)
      listNum.push(usersData[i].phone);
  }
  return listNum;
}

/**
 * 
 * @param {*} productsData Liste des produits
 * @returns Return l'ensemble des produits, classés par catégorie, précisant le libelle et le stock
 */
function getInfoProduit(productsData){
  var listProd = {};
  if (typeof(productsData) != typeof([]))
    throw new Error ("La liste des produits doit être un tableau contenant des produits");
  if (productsData.length == 0)
    throw new Error ("La liste des produits est vide");
  
  // Cette boucles permet d'ajouter des clés => valeur (= nom de la catégorie => Liste vide) pour chaque catégories pas encore présentes
  for(i of productsData){
    categ = i.category;
    if((typeof(categ) == typeof(1)) || (typeof(categ) == typeof(1.0)))
      throw new Error ("La catégorie est un entier");
    if (productsData.indexOf(categ)===-1)
      listProd[i.category] = [];
  }

  // Cette boucle va permettre d'ajouter le libelle du produit ainsi qu'un mot qui va changer selon la quantité de stock
  for(j of productsData){
    stock = j.stock;
    if (stock < 0)
      throw new Error ("Le stock est négatif, vous devez des produits");
    if (stock <= 10 && stock >= 0)
      stoock = "low"
    if (stock > 10 && stock < 50)
      stoock = "medium"
    if (stock >= 50)
      stoock = "hight"
    listProd[j.category].push({libelle: j.title, dispo: stoock});
  }
  return listProd;
}

module.exports = {
  getUser,
  getNumero,
  getInfoProduit,
};
