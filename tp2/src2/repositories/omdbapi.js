// import
var axios = require("axios").default;
const { getCollection } = require('../services/db/connection');

// Cette fonction va permettre de rechercher un film dans l'API de omdapi pour pouvoir l'ajouter dans la base de données
function searchMovies(collectionName, doc){

  var options = {
    method: 'GET',
    url: 'http://www.omdbapi.com/',
    params: doc
  };
  
  // On exécuter une requête avec axios pour récupérer les informations du film
  axios.request(options).then(function (response) {
    
    console.log(response.data.Search);

    const collection = getCollection(collectionName);
    
    const result = collection.insertOne(response.data.Search[0]);
  }).catch(function (error) {

    console.error(error);
  });
}

module.exports = {
  searchMovies
};