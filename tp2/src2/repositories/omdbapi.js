var axios = require("axios").default;
const { getCollection } = require('../services/db/connection');

function searchMovies(collectionName, doc){
  var options = {
    method: 'GET',
    url: 'http://www.omdbapi.com/',
    params: doc
  };
  
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