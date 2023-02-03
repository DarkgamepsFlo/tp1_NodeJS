const { getCollection } = require('../../../src2/services/db/connection');
const { searchMovies } = require('../../../src2/repositories/omdbapi')

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

// 4 ////////////////////////

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
    createWatchList
};