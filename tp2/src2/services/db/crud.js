const { getCollection } = require('../../../src2/services/db/connection');
const { searchMovies } = require('../../../src2/repositories/omdbapi');

// 1 ////////////////////////
async function insertClient(collectionName, doc) {
  try {
    const collection = getCollection(collectionName);
    // create a document to insert
    const result = await collection.insertOne(doc);
	console.log(`A document was inserted with the _id: ${result.insertedId}`);
	return "Le client est bien enregistré dans la base de données";

  } catch(e) {
	console.log("Le client n'a pas pu être inséré")
	console.log(e);
	throw e;
  }
}

// 2 ////////////////////////
// insertMovies('movies', {title: The Second 100 Years, key: key});
async function insertMovies(collectionName, doc) {
  try {
    // create a document to insert
    searchMovies(collectionName, doc);
    return "Le film est bien enregistré dans la base de données";
	// console.log(`A document was inserted with the _id: ${result.insertedId}`);

  } catch(e) {
	console.log("Le film n'a pas pu être inséré")
	console.log(e);
	throw e;
  }
}

// 3 ////////////////////////
async function createWatchList(collectionName, filter) {
  try {
    const collection = getCollection(collectionName);

    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false };

    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        watchlist: []
      },
    };

    console.log(filter.name);

    const result = await collection.updateOne(filter, updateDoc, options);

    const result2 = insertWatchlist("watchlist", filter.name);

    console.log(result2);

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
	  return result;
  } catch(e) {
	console.log("Pas d'users updaté")
	console.log(e);
	throw e;
  }
}

async function insertWatchlist(collectionName, pseudo) {
  try {
    const collection = getCollection(collectionName);

    var element = {
      id_utilisateur: pseudo,
      film: []
    }

    // create a document to insert
    const result = await collection.insertOne(element);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return "La watchList est bien enregistré dans la base de données";

  } catch(e) {
	console.log("La watchList n'a pas pu être inséré")
	console.log(e);
	throw e;
  }
}

// 4 //////////////////////// !! Il faut que le client ainsi que l'attribut watchLlist existe au préalable
async function insertItem(collectionName, filter, options = {}) {
  try {
    const collection = getCollection(collectionName);
    const collection2 = getCollection('movies');
    const collection3 = getCollection('users');

    const options = { upsert: false };

    const search = {
      name: filter.watchlist.id_utilisateur
    };

    // Je récupère les infos du film et de l'utilsateur ayant la watchList 
    const result3 = await collection.findOne(filter.watchlist, options);
		const result = await collection2.findOne(filter.titre, options);
    const result2 = await collection3.findOne(search, options);
		
    // J'ajoute le film dans le watchlist client
    const newList = result2.watchlist;
    newList.push(filter.titre.Title);

    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        watchlist: newList
      },
    };

    collection3.updateOne(search, updateDoc, options);

    // J'ajoute les informations du film dans le watchList
    const newitem = result3.film;
    newitem.push([result.Title, result.Year, result.Type, "A voir"]);


    // create a document that sets the plot of the movie
    const updateItem = {
      $set: {
        film: newitem
      },
    };

    const result4 = await collection.updateOne(filter.watchlist, updateItem, options);

    return result4;

	// console.log(`A document was inserted with the _id: ${result.insertedId}`);

  } catch(e) {
	console.log("L'item n'a pas pu être inséré")
	console.log(e);
	throw e;
  }
}

// Récupérer la variable contenant les états d'un film
// const result666 = await collection.findOne(filter.watchlist, options);
// console.log(result666.film[identifiant_du_film][3]);
  
// 5 ////////////////////////
// Le body contient le nom de la watchlist, le nom du film et le nom du status à attribuer
async function updateStatus(collectionName, body) {
  try {
    const collection = getCollection(collectionName);

    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };

    // create a filter for a movie to update
    const filter = body.watchlist;
    
    const result = await collection.findOne(filter, options);
    const film = result.film;

    console.log(result)

    for (var i = 0; i < film.length; i++){
      console.log(i);
      if (film[i][0] == body.titlefilm){
        console.log(film[i][0]);
        film[i][3] = body.status
      }
    }

    const updateItem = {
      $set: {
        film: film
      },
    };

  const result2 = await collection.updateOne(body.watchlist, updateItem, options);

	return result2;

  } catch(e) {
	console.log("Pas d'users updaté")
	console.log(e);
	throw e;
  }
}

// 6 ////////////////////////
async function findItem(collectionName, filter) {
  try {
    const collection = getCollection(collectionName);
    const query = { Title: filter };
    const options = {
      sort: { name: 1 },
      projection: { _id: 0, Title: 1, Year: 1 },
    };
    const cursor = collection.find(query, options);

    // Liste parcourant l'ensemble des résultats
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });

    return result;
  } catch(e) {
    console.log("Pas d'users trouvé")
    console.log(e);
    throw e;
    }
}


// 7 ////////////////////////
async function findUsers(collectionName) {
  try {
    const collection = getCollection(collectionName);
    const query = {};
    const options = {
      sort: { name: 1 },
      projection: { _id: 0, name: 1 },
    };
    const cursor = collection.find(query, options);

    // Liste parcourant l'ensemble des résultats
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });

    return result;
  } catch(e) {
    console.log("Les users n'ont pas été trouvé")
    console.log(e);
    throw e;
    }
}

// 8 ////////////////////////
async function findWatchList(collectionName, nom) {
  try {
    const collection = getCollection(collectionName);
    const query = {name : nom};
    const options = {
      sort: { name: 1 },
      projection: { _id: 0, name: 1, watchlist: 1 },
    };
    const cursor = collection.find(query, options);

    // Liste parcourant l'ensemble des résultats
    const result = [];
    await cursor.forEach((item) => {
      console.log(item);
      result.push(item);
    });

    return result;
  } catch(e) {
    console.log("Les watchlist n'ont pas été trouvé")
    console.log(e);
    throw e;
    }
}

// 9 ////////////////////////
async function findFilm(collectionName, nomWatchList) {
  try {
    const collection = getCollection(collectionName);
    const query = {id_utilisateur : nomWatchList};
    const options = {
      sort: { id_utilisateur: 1 },
      projection: { _id: 0, id_utilisateur : 1, film : 1 },
    };
    const cursor = collection.find(query, options);

    // Liste parcourant l'ensemble des résultats
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });

    return result;
  } catch(e) {
    console.log("Les films n'ont pas été trouvé")
    console.log(e);
    throw e;
    }
}

// 10 //////////////////////////////////
async function deleteItem(collectionName, filter, options = {}) {
  try {
    const collection = getCollection(collectionName);
    const collection2 = getCollection('movies');
    const collection3 = getCollection('users');

    const options = { upsert: false };

    // watchlist { id_utilisateur ... } ...
    const search = {
      name: filter.watchlist.id_utilisateur
    };

    // Je récupère les infos du film et de l'utilsateur ayant la watchList 
    // Infos sur la watchList (qui contient l'ensemble des films)
    const result3 = await collection.findOne(filter.watchlist, options);
    // Infos sur le film (l'item) qu'on veut supprimer
		const result = await collection2.findOne(filter.titre, options);
    // Infos sur l'utilisateur possédant la watchList
    const result2 = await collection3.findOne(search, options);
		
    // J'ajoute le film dans le watchlist client
    const newList = result2.watchlist;
    newList.splice(filter.titre.Title, 1);

    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        watchlist: newList
      },
    };

    collection3.updateOne(search, updateDoc, options);

    // J'ajoute les informations du film dans le watchList
    const newitem = result3.film;
    newitem.splice([result.Title, result.Year, result.Type], 1);

    // create a document that sets the plot of the movie
    const updateItem = {
      $set: {
        film: newitem
      },
    };

    const result4 = await collection.updateOne(filter.watchlist, updateItem, options);

    return result4;

	// console.log(`A document was inserted with the _id: ${result.insertedId}`);

  } catch(e) {
	console.log("L'item n'a pas pu être inséré")
	console.log(e);
	throw e;
  }
}

// 11 ////////////////////////////////
async function updateUsers(collectionName, nomAncien, nomNouveau, yearNouveau) {
  try {
    const collection = getCollection(collectionName);

    // create a filter for a movie to update
    const filter = { name: nomAncien };

    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };

    if(nomNouveau == "_" && yearNouveau == "_") 
      return "Veuillez ajouter des nouvelles informations pour pouvoir modifier";

    // create a document that sets the plot of the movie
    if(yearNouveau == "_"){
      updateDoc = {
        $set: {
          name: nomNouveau
        }
      }
    }
      
    if(nomNouveau == "_"){
      updateDoc = {
        $set: {
          age: yearNouveau
        }
      }
    }

    if(nomNouveau != "_" && yearNouveau != "_"){
      updateDoc = {
        $set: {
          name: nomNouveau,
          age: yearNouveau
        },
      };
    }

    const result = await collection.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );

	return result;
  } catch(e) {
	console.log("Pas d'users updaté")
	console.log(e);
	throw e;
  }
}

// 12 //////////////////////////////
async function deleteWatchlist(collectionName, item) {
  try {
    const collection = getCollection(collectionName);

    // Query for a movie that has title "Annie Hall"
    const query = { id_utilisateur: item };

    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
	return result;
  } catch(e) {
	console.log("La personne n'est pas effacée")
	console.log(e);
	throw e;
  }
}


// async function findOne(collectionName, query, options = {}) {
// 	try {
// 		const collection = getCollection(collectionName);
// 		const result = await collection.findOne(query, options);
// 		return result;
// 	} catch (e) {
// 		console.log(`Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`);
// 		console.log(e);
// 		throw e;
// 	}
// }

// async function find(collectionName) {
//   try {
//     const collection = getCollection(collectionName);
//     const query = { name: "Till" };
//     const options = {
//       sort: { name: 1 },
//       projection: { _id: 0, name: 1 },
//     };
//     const cursor = collection.find(query, options);

//     // Liste parcourant l'ensemble des résultats
//     const result = [];
//     await cursor.forEach((item) => {
//       result.push(item);
//     });

//     return result;
//   } catch(e) {
//     console.log("Pas d'users trouvé")
//     console.log(e);
//     throw e;
//     }
// }

// async function insertMany(collectionName) {
//   try {
//     const collection = getCollection(collectionName);

//     // create an array of documents to insert
//     const docs = [
//       { name: "Till" },
//       { name: "Flake" },
//       { name: "Chris" }
//     ];

//     // this option prevents additional documents from being inserted if one fails
//     const options = { ordered: true };

//     const result = await collection.insertMany(docs, options);
//     console.log(`${result.insertedCount} documents were inserted`);
// 	  return result;
//   } catch(e) {
// 	console.log("Pas d'users inséré")
// 	console.log(e);
// 	throw e;
//   }
// }

// async function updateOne(collectionName) {
//   try {
//     const collection = getCollection(collectionName);

//     // create a filter for a movie to update
//     const filter = { name: "Ramm" };

//     // this option instructs the method to create a document if no documents match the filter
//     const options = { upsert: true };

//     // create a document that sets the plot of the movie
//     const updateDoc = {
//       $set: {
//         name: "Rammstein"
//       },
//     };

//     const result = await collection.updateOne(filter, updateDoc, options);
//     console.log(
//       `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
//     );
// 	return result;
//   } catch(e) {
// 	console.log("Pas d'users updaté")
// 	console.log(e);
// 	throw e;
//   }
// }

// async function updateMany(collectionName) {
//   try {
//     const collection = getCollection(collectionName);

//     // create a filter to update all movies with a 'G' rating
//     const filter = { name: "Flo" };

//     // increment every document matching the filter with 2 more comments
//     const updateDoc = {
//       $set: {
//         name: "Florian"
//       },
//     };
//     const result = await collection.updateMany(filter, updateDoc);
//     console.log(`Updated ${result.modifiedCount} documents`);
// 	return result;
//   } catch(e) {
// 	console.log("Pas tout les users updatés")
// 	console.log(e);
// 	throw e;
//   }
// }

// async function replace(collectionName) {
//   try {
//     const collection = getCollection(collectionName);

//     // create a query for a movie to update
//     const query = { name: "Florian" };
//     // create a new document that will be used to replace the existing document
//     const replacement = {
//       name: "Till"
//     };

//     const result = await collection.replaceOne(query, replacement);
//     console.log(`Modified ${result.modifiedCount} document(s)`);
// 	return result;
//   } catch(e) {
// 	console.log("Pas de replace")
// 	console.log(e);
// 	throw e;
//   }
// }

// async function deleteOne(collectionName) {
//   try {
//     const collection = getCollection(collectionName);

//     // Query for a movie that has title "Annie Hall"
//     const query = { name: "Till" };

//     const result = await collection.deleteOne(query);
//     if (result.deletedCount === 1) {
//       console.log("Successfully deleted one document.");
//     } else {
//       console.log("No documents matched the query. Deleted 0 documents.");
//     }
// 	return result;
//   } catch(e) {
// 	console.log("La personne n'est pas effacée")
// 	console.log(e);
// 	throw e;
//   }
// }

// async function deleteMany(collectionName) {
//   try {
//     const collection = getCollection(collectionName);

//     // Query for all movies with a title containing the string "Santa"
//     const query = { name: "Florian" };

//     const result = await collection.deleteMany(query);
//     console.log("Deleted " + result.deletedCount + " documents");
// 	return result;
//   } catch(e) {
// 	console.log("Les personnes ne sont pas effacées")
// 	console.log(e);
// 	throw e;
//   }
// }

module.exports = {
    insertClient,
    insertMovies,
    createWatchList,
    insertItem,
    updateStatus,
    findUsers, 
    findWatchList,
    findFilm,
    findItem,
    deleteWatchlist,
    updateUsers,
    deleteItem,
};