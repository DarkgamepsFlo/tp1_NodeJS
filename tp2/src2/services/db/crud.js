// Ce fichier regroupe l'ensemble des fonctions permettant de répondre à l'ensemble des fonctionnalités demandées dans l'énoncé

// import
const { getCollection } = require('../../../src2/services/db/connection');
const { searchMovies } = require('../../../src2/repositories/omdbapi');
const {loggerwarn, loggererror, loggerinfo} = require('../../log');

// 1 //
/**
 * Cette fonction va permettre d'insérer un client dans la base de données
 * @param {String} collectionName Nom de la collection
 * @param {*} doc  Représente le fichier .json contenant le nom et l'age de la personne à insérer
 * @returns Du code HTML qui va être reconnu par pug
 */
async function insertClient(collectionName, doc) {
  try {
    // S'il n'y a pas d'information, on redemande à l'utilisateur de les indiquer
    if(doc.name == "" || doc.age == ""){
      loggererror.log("error", "L'ensemble des informations nécessaires ne sont pas présentes dans la fonction insertClient");
      return ("<h1>Veuillez renseigner l'ensemble des informations nécessaire</h1><p>Pour retourner au menu prédédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>");
    } else if(!doc.name || !doc.age){
      loggererror.log("error", "Des attributs sont manquants dans la fonction insertClient");
      return ("<h1>Veuillez renseigner l'ensemble des informations nécessaire</h1><p>Pour retourner au menu prédédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>");
    } else{
      // On contient dans une variable l'ensemble des éléments présents dans la table inséré en paramètre
      const collection = getCollection(collectionName);
      // On va insérer l'utilisateur dans la table puis préciser qu'il est bien inséré
      const result = await collection.insertOne(doc);

      loggerinfo.log("info", `A document was inserted with the _id: ${result.insertedId} dans la fonction insertClient`)

      return ("<h1>L'utilisateur est bien enregistré dans la base de données</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>");
    }
  } catch(e) { // S'il y a un problème, on va préciser que l'utilisateur n'est pas inséré
    loggererror.log("error", `Il y a une erreur dans la fonction insertClient : ${e}`)
	  throw "<h1>Le client n'a pas pu être inséré</h1>";
  }
}

// 2 //
/**
 * Cette fonction permet d'insérer un film dans la base de données
 * @param {String} collectionName Nom de la collection
 * @param {*} doc Représente le fichier .json contenant le nom du film
 * @returns Du code HTML qui va être reconnu par pug
 */
async function insertMovies(collectionName, doc) {
  try {
    // S'il n'y a pas d'information, on redemande à l'utilisateur de les indiquer
    if(doc.s == "" || doc.apikey == ""){
      loggererror.log("error", "L'ensemble des informations nécessaires ne sont pas présentes dans la fonction insertMovies");
      return ("<h1>Veuillez renseigner l'ensemble des informations nécessaire</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
    } else {
        // On fait appel à la fonction présente dans le fichier omdbapi.js pour pouvoir ajouter un film puis on précise que le film est bien ajouté
      searchMovies(collectionName, doc);
      loggerinfo.log("info", `Le film est bien enregistré dans la fonction insertMovies`)
      return ("<h1>Le film est bien enregistré dans la base de données</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>");
    }
  } catch(e) { // S'il y a un problème, on va préciser que le film n'est pas inséré
    loggererror.log("error", `Il y a une erreur dans la fonction insertMovies : ${e}`)
	throw "<h1>Le film n'a pas pu être inséré</h1>";
  }
}

// 3 //
/**
 * Cette fonction va permettre de créer une watchlist pour un utilisateur
 * @param {*} collectionName Nom de la collection 
 * @param {*} filter Filtre permettant de prendre le nom de l'utilisateur
 * @returns Du code HTML qui va être reconnu par pug
 */
async function createWatchList(collectionName, filter) {
  try {
    // S'il n'y a pas d'information, on redemande à l'utilisateur de les indiquer
    if(filter.name == ""){
      loggererror.log("error", "Il manque le nom dans la fonction createWatchList");
      return ("<h1>Veuillez renseigner le nom de l'utilisateur</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>");
    }
    if(!filter.name){
      loggererror.log("error", "Il manque l'attribut name dans la fonction createWatchList");
      return ("<h1>Veuillez renseigner le nom de l'utilisateur</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/users'>Menu précédent</a></p>");
    }
    else{
      // On récupère les données de la table passé en paramètre
      const collection = getCollection(collectionName);

      // this option instructs the method to create a document if no documents match the filter
      const options = { upsert: false };
  
      // create a document that sets the plot of the movie
      const updateDoc = {
        $set: {
          name : filter.name,
          watchlist: []
        },
      };
  
      // On va ajouter une variable watchlist de type Array pour l'utilisateur choisi
      const result = await collection.updateOne(filter, updateDoc, options);
  
      // On va ajouter une nouvelle watchList dans la table watchList
      insertWatchlist("watchlist", filter.name);
  
      loggerinfo.log("info", `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s) dans la fonction createWatchList`)

      return ("<h1>La watchList est bien ajouté à l'utilisateur</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>");
    }
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction createWatchList : ${e}`)
	throw e;
  }
}


/**
 * Cette fonction permet d'insérer une watchList dans la base de données.
 * Elle est utilisé dans createWatchList
 * @param {*} collectionName Nom de la collection 
 * @param {*} pseudo Prend le nom de l'utilisateur pour en créer une watchList
 * @returns Du code HTML qui va être reconnu par pug
 */
async function insertWatchlist(collectionName, pseudo) {
  try {
    // On récupère l'ensemble des éléments de la table watchlist
    const collection = getCollection(collectionName);

    var element = {
      id_utilisateur: pseudo,
      film: []
    }

    // create a document to insert
    const result = await collection.insertOne(element);

    loggerinfo.log("info", `A document was inserted with the _id: ${result.insertedId} dans la fonction insertWatchlist`)

    return "La watchList est bien enregistré dans la base de données";

  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction insertWatchlist : ${e}`)
	throw e;
  }
}

// 4 //
/**
 * Cette fonction permet d'ajouter un film dans une WatchList !! Il faut que le client ainsi que l'attribut watchLlist existe au préalable
 * @param {*} collectionName Nom de la collection 
 * @param {*} filter Filtre qui prend le nom du Film et celui de la watchList
 * @param {*} options il n'y a pas d'option (Fichier Json vide)
 * @returns Du code HTML qui va être reconnu par pug
 */
async function insertItem(collectionName, filter, options = {}) {
  try {
    // S'il n'y a pas d'information, on redemande à l'utilisateur de les indiquer
    if(filter.id_utilisateur == "" || filter.Title == ""){
      loggererror.log("error", "L'ensemble des informations nécessaires ne sont pas présentes dans la fonction insertItem");
      return ("<h1>Veuillez renseigner les informations pour pouvoir insérer un film</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
    }
    else{
      // On récupère l'ensemble des éléments de la base de données
      const collection = getCollection(collectionName);
      const collection2 = getCollection('movies');
      const collection3 = getCollection('users');

      const options = { upsert: false };

      // Les variables search, search2, search3 vont permettre de trouver les éléments qu'il nous faut
      const search = {
        name: filter.id_utilisateur
      };

      const search2 = {
        id_utilisateur: filter.id_utilisateur
      }

      const search3 = {
        Title: filter.Title
      }

      // Je récupère les infos du film, de la watchlist et de l'utilisateur possèdant cette watchList
      const result3 = await collection.findOne(search2, options);
      const result = await collection2.findOne(search3, options);
      const result2 = await collection3.findOne(search, options);

      // J'ajoute le film dans la watchlist de l'utilisateur
      const newList = result2.watchlist;
      newList.push(filter.Title);

      // create a document that sets the plot of the movie
      const updateDoc = {
        $set: {
          watchlist: newList
        },
      };

      collection3.updateOne(search, updateDoc, options);

      // J'ajoute les informations du film dans la watchList correspondant à celle de l'utilisateur
      const newitem = result3.film;
      newitem.push([result.Title, result.Year, result.Type, "A voir"]);


      // create a document that sets the plot of the movie
      const updateItem = {
        $set: {
          film: newitem
        },
      };

      collection.updateOne(search2, updateItem, options);

      loggerinfo.log("info", `A document was inserted with the _id: ${result.insertedId} dans la fonction insertItem`)

      return ("<h1>Le film est bien inséré dans la Watchlist</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>");
          }
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction insertItem : ${e}`)
	throw e;
  }
}

// 5 //
/**
 * Cette fonction va permettre de modifier le status d'un film se trouvant dans une WatchList (Il est de base égal à "à voir")
 * @param {*} collectionName Nom de la collection 
 * @param {*} body Représente un fichier .json qui va contenir le nom du film, le nom de la watchList et le nouveau status
 * @returns Du code HTML qui va être reconnu par pug
 */
async function updateStatus(collectionName, body) {
  try {
    // S'il n'y a pas d'information, on redemande à l'utilisateur de les indiquer
    if(body.id_utilisateur == "" || body.titlefilm == ""){
      loggererror.log("error", "L'ensemble des informations nécessaires ne sont pas présentes dans la fonction updateStatus");
      return ("<h1>Veuillez renseigner les informations pour pouvoir changer le status du film</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
    }
          else{
      // On récupère les élements de la table watchList
      const collection = getCollection(collectionName);

      const search = {
        id_utilisateur: body.id_utilisateur
      }

      // this option instructs the method to create a document if no documents match the filter
      const options = { upsert: true };
      
      // On récupère la liste de film se trouvant dans la watList
      const result = await collection.findOne(search, options);

      const film = result.film;

      // Pour chaque film, si le film possède le même titre que celui qu'on veut modifier.
      // Si oui, on va mondifier son status par celui qu'on veut mettre
      for (var i = 0; i < film.length; i++){
        if (film[i][0] == body.titlefilm){
          film[i][3] = body.status
        }
      }

      const updateItem = {
        $set: {
          film: film
        },
      };

      // On va modifier le film dans la watchList en le remplacant par le même film avec un nouveau status
      collection.updateOne(search, updateItem, options);

      loggerinfo.log("info", `Le status est bien modifié dans la fonction updateStatus`)

      return ("<h1>Le status est bien modifié</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>");
    }
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction updateStatus : ${e}`)
	throw e;
  }
}

// 6 //
/**
 * Cette fontion va nous permettre de trouver un film dans la liste de film 
 * @param {*} collectionName Nom de la collection 
 * @param {*} filter Filtre qui prend le nom du film
 * @returns Du code HTML qui va être reconnu par pug
 */
async function findItem(collectionName, filter) {
  try {
    const collection = getCollection(collectionName);

    // Si le nom est égal à "_", alors on va récupétrer l'ensemble des éléments
    if(filter == "_"){
      loggerwarn.log("warn", "Il manque le filtre dans la fonction findItem");
      var query = { };
    }
      
    else  
      var query = { Title: filter };
      
    // On récupère l'ensemble des éléments de la table film
    const options = {
      sort: { name: 1 },
      projection: { _id: 0, Title: 1, Year: 1 },
    };
    const cursor = collection.find(query, options);

    // Liste parcourant l'ensemble des résultats, on ajoute le résultat dans une autre liste si le titre correspond
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });

    loggerinfo.log("info", `L'ensemble des éléments sont trouvés dans la fonction findItem`)

    return result;
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction findItem : ${e}`)
    throw e;
    }
}


// 7 //
/**
 * Cette fonction va permettre de récupérer la liste de m'ensemble des utilisateurs
 * @param {*} collectionName Nom de la collection 
 * @returns Du code HTML qui va être reconnu par pug
 */
async function findUsers(collectionName) {
  try {

    // On va récupérer l'ensemble des éléments dans la table users
    const collection = getCollection(collectionName);
    const query = {};
    const options = {
      sort: { name: 1 },
      projection: { _id: 0, name: 1 },
    };
    const cursor = collection.find(query, options);

    // On va ajouter chaque résultat dans une liste qu'on va afficher
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });

    loggerinfo.log("info", `L'ensemble des éléments sont trouvés dans la fonction findUsers`)

    return result;
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction findUsers : ${e}`)
    throw e;
    }
}

// 8 //
/**
 * Cette fonction va permettre d'afficher l'ensemble des watchLists d'un utilisateur
 * @param {*} collectionName Nom de la collection 
 * @param {*} nom Prend le nom de l'utilisateur
 * @returns Du code HTML qui va être reconnu par pug
 */
async function findWatchList(collectionName, nom) {
  try {

    // On va récupérer l'ensemble des utilisateurs
    const collection = getCollection(collectionName);
    const query = {name : nom};
    const options = {
      sort: { name: 1 },
      projection: { _id: 0, name: 1, watchlist: 1 },
    };
    const cursor = collection.find(query, options);

    // On va ajouter l'ensemble des watchLists de l'utilisateur
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });

    loggerinfo.log("info", `L'ensemble des éléments sont trouvés dans la fonction findWatchList`)

    return result;
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction findWatchList : ${e}`)
    throw e;
    }
}

// 9 //
/**
 * Cette fonction permet de récupérer le contenu d'une WatchList
 * @param {*} collectionName Nom de la collection 
 * @param {*} nomWatchList Prend le nom de la waychList
 * @returns Du code HTML qui va être reconnu par pug
 */
async function findFilm(collectionName, nomWatchList) {
  try {
    // On récupère l'ensemble des éléments dans la table watchList
    const collection = getCollection(collectionName);
    const query = {id_utilisateur : nomWatchList};
    const options = {
      sort: { id_utilisateur: 1 },
      projection: { _id: 0, id_utilisateur : 1, film : 1 },
    };
    const cursor = collection.find(query, options);

    // Liste parcourant l'ensemble des résultats et on ajouter les films dans une liste si le nom de la watchList correspond
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });

    loggerinfo.log("info", `L'ensemble des éléments sont trouvés dans la fonction findFilm`)

    return result;
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction findFilm : ${e}`)
    throw e;
    }
}

// 10 //
/**
 * Cette fonction permet de supprimer un item d'une watchList
 * @param {*} collectionName Nom de la collection 
 * @param {*} filter Filtre qui prend le nom d'un film et d'une watchList
 * @param {*} options Il représente un fichier .json vide
 * @returns Du code HTML qui va être reconnu par pug
 */
async function deleteItem(collectionName, filter, options = {}) {
  try {
    if(filter.id_utilisateur == "" || filter.titre == ""){
      loggererror.log("error", "L'ensemble des informations nécessaire ne sont pas présentes dans la fonction deleteItem");
      return ("<h1>Veuillez renseigner les informations pour pouvoir supprimer un film</h1><p>Pour retourner au menu précédent : <a href='http://localhost:3000/movies'>Menu précédent</a></p>");
    }
    else{
      // On récupère l'ensemble des éléments de chaque tables
      const collection = getCollection(collectionName);
      const collection2 = getCollection('movies');
      const collection3 = getCollection('users');

      const options = { upsert: false };

      const search = {
        name: filter.id_utilisateur
      };

      const search2 = {
        id_utilisateur: filter.id_utilisateur
      };

      const search3 = {
        Title: filter.titre
      };

      // Je récupère les infos du film et de l'utilsateur ayant la watchList 
      // Infos sur la watchList (qui contient l'ensemble des films)
      const result3 = await collection.findOne(search2, options);
      // Infos sur le film (l'item) qu'on veut supprimer
      const result = await collection2.findOne(search3, options);
      // Infos sur l'utilisateur possédant la watchList
      const result2 = await collection3.findOne(search, options);

      // J'ajoute le film dans le watchlist client
      const newList = result2.watchlist;
      newList.splice(filter.titre, 1);

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

      collection.updateOne(search2, updateItem, options);

      loggerinfo.log("info", `A document was inserted with the _id: ${result.insertedId} dans la fonction deleteItem`)

      return "<h1>L'Item est bien supprimé de la watchList</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>"
    }
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction deleteItem : ${e}`)
	throw e;
  }
}

// 11 //
/**
 * Cette fonction va nous permettre de modifier les informations d'un utilisateur
 * @param {*} collectionName Nom de la collection 
 * @param {*} body Représente un fichier .json qui prend le nom de l'utilisateur, le nouveau nom de l'utilisateur (s'il existe) et le nouvel age de l'utilisateur (s'il existe)
 * @returns Du code HTML qui va être reconnu par pug
 */
async function updateUsers(collectionName, body) {
  try {
    const collection = getCollection(collectionName);

    // create a filter for a movie to update
    const filter = { name: body.nomAncien };

    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };

    // Si rien est rempli, on va demander de saisir quelque chose
    if(body.nomNouveau == "_" && body.yearNouveau == "_"){
      loggererror.log("error", "L'ensemble des informations nécessaire ne sont pas présentes dans la fonction updateUsers");
      return "<h1>Veuillez ajouter des nouvelles informations pour pouvoir modifier</h1><p>Pour choisir des paramètre de mdifiation : <a href='http://localhost:3000/users'>Page précédente</a></p>";
    }
      
    // create a document that sets the plot of the movie
    // S'il n'y a pas d'age, on modifie que le nom
    if(body.yearNouveau == "_"){
      updateDoc = {
        $set: {
          name: body.nomNouveau
        }
      }
    }
      
    // S'il n'y a pas de nom, on modifie uniquement l'age
    if(body.nomNouveau == "_"){
      updateDoc = {
        $set: {
          age: body.yearNouveau
        }
      }
    }

    // Sinon on va modifier les deux
    if(body.nomNouveau != "_" && body.yearNouveau != "_"){
      updateDoc = {
        $set: {
          name: body.nomNouveau,
          age: body.yearNouveau
        },
      };
    }

    const result = await collection.updateOne(filter, updateDoc, options);

    loggerinfo.log("info", `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s) dans la fonction updateUsers`)

	  return "<h1>Les modifications apportées à l'utilisateur ont fonctionnées</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>";
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction updateUsers : ${e}`)
	throw e;
  }
}

// 12 //
/**
 * Cette fonction permet de supprimer un WatchList
 * @param {*} collectionName Nom de la collection 
 * @param {*} item Permet de prendre le nom d'une watchList
 * @returns Du code HTML qui va être reconnu par pug
 */
async function deleteWatchlist(collectionName, item) {
  try {
    // On récupère l'ensemble des données dans la table WatchList
    const collection = getCollection(collectionName);

    // Query for a movie that has title "Annie Hall"
    const query = { id_utilisateur: item.id_utilisateur };

    // On va supprimer celui correspondant à celui présent dans la recherche
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
      loggerinfo.log("info", `Le document est bien supprimé dans la fonction deleteWatchlist`)
    } else {
      loggerinfo.log("info", `Aucun document correspond à la recherche dans la fonction deleteWatchlist`)
    }
    return "<h1>La watchList est bien supprimé</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>";
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction deleteWatchlist : ${e}`)
	throw e;
  }
}

// 13 //
/**
 * Cette fonction permet de mettre une WatchList en favori
 * @param {*} collectionName Nom de la collection 
 * @param {*} filter Filtre qui prend le nom de la watchList et le nom de l'utilisateur
 * @param {*} options Fichier .json vide car il n'y a pas d'option
 * @returns Du code HTML qui va être reconnu par pug
 */
async function addFavori(collectionName, filter, options = {}) {
  try {
    if(filter.id_utilisateur == ""){
      loggererror.log("error", "Le nom de la watchList est manquante dans la fonction addFavori");
      return "<h1>Veuillez préciser la watchList à mettre en favori</h1><p>Pour choisir des paramètre de mdifiation : <a href='http://localhost:3000/movies'>Page précédente</a></p>";
    }
          
    const collection = getCollection(collectionName);

    const options = { upsert: false };
    const search = {
      id_utilisateur: filter.id_utilisateur
    };

    // Je récupère les infos du film et de l'utilsateur ayant la watchList 
    // Infos sur la watchList (qui contient l'ensemble des films)
    const result3 = await collection.findOne(filter.watchlist, options);

    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        favori: true
      },
    };

    collection.updateOne(search, updateDoc, options);

    loggerinfo.log("info", `La watchList est bien en favorie dans la fonction addFavori`)

    return "<h1>La watchList est bien en favori</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>";
    
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction addFavori : ${e}`)
	throw e;
  }
}

// 14 //
/**
 * Cette fonction permet de partager une WatchList avec une autre personne
 * @param {*} collectionName Nom de la collection 
 * @param {*} filter Filtre qui prend le nom de la personne, de la watchlist et de la personne qui va reçevoir cette watchList
 * @param {*} options Fichier .json vide car il n'y a pas d'option
 * @returns Du code HTML qui va être reconnu par pug
 */
async function partageWatchlist(collectionName, filter, options = {}) {
  try {
    if(filter.id_utilisateur == "" || filter.name == ""){
      loggererror.log("error", "L'ensemble des informations nécessaire ne sont pas présentes dans la fonction partageWatchlist");
      return "<h1>Veuillez préciser la watchList qui va partager et l'utilisateur qui va reçevoir</h1><p>Pour choisir des paramètre de mdifiation : <a href='http://localhost:3000/movies'>Page précédente</a></p>";
    }
          else{
      // On va récupérer l'ensemble des informations des users et des watchLists
      const collection = getCollection(collectionName);
      const collection2 = getCollection('users');

      const options = { upsert: false };

      const search = {
          name: filter.name
      }

      const search2 = {
        id_utilisateur: filter.id_utilisateur
      }

      // Je récupère les infos du film et de l'utilsateur ayant la watchList
      // Infos sur la watchList (qui contient l'ensemble des films)
      const result3 = await collection.findOne(search2, options);
      // Infos sur l'utilisateur possédant la watchList
      const result4 = await collection2.findOne({name : filter.id_utilisateur}, options);
      // sur l'utilisateur qui va avoir la copie partagé
      const result2 = await collection2.findOne(search, options);

      // On modifie le nom de la variable pour pouvoir l'insérer
      const variable = "watchlist"+filter.id_utilisateur;
      // create a document that sets the plot of the movie
      const updateDoc = {
        $set: {
          [variable]: result4.watchlist
        },
      };

      // Permet de rajouter la watchlist dans la base de donnée de cette personne
      await collection2.updateOne(search, updateDoc, options);

      var element = {
        id_utilisateur: result3.id_utilisateur+filter.name,
        film: result3.film
      }

      // create a document to insert
      const result = await collection.insertOne(element);

      loggerinfo.log("info", `La watchList est bien partagé dans la fonction partageWatchlist`)

      return "<h1>Le partage est effectué</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>";
    }
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction partageWatchlist : ${e}`)
	throw e;
  }
}

// 15 //
/**
 * Cette fonction permet d'ajouter une description à une watchList ou a un film
 * @param {*} collectionName Nom de la collection 
 * @param {*} filter Filtre qui prend le nom de la watchlist, le nom du film (si on veut mettre un commentaire) et le commentaire
 * @param {*} options Fichier .json vide car il n'y a d'options
 * @returns Du code HTML qui va être reconnu par pug
 */
async function ajoutDescription(collectionName, filter, options = {}) {
  try {

    const collection = getCollection(collectionName);

    const options = { upsert: true };

    var result = "";
    var resultFilm;
    var i = 0;

    // Variable permettant de trouver une watchList
    const searchWatch = {
      id_utilisateur: filter.id_utilisateur
    }

    // Variable permettant d'ajouter la description de la watchList ou film
    const updateDoc = {
      $set: {
        descriptions: filter.content
      }
    }

    // Infos sur la watchList (qui contient l'ensemble des films)
    const result3 = await collection.findOne(filter.watchlist, options);

    if(filter.Title == "" && filter.id_utilisateur == ""){
      loggererror.log("error", "L'ensemble des informations nécessaires ne sont pas présentes dans la fonction ajoutDescription");
      return "<h1>Veuillez saisir les informations nécessaires</h1><p>Pour retourner au menu précédant : <a href='http://localhost:3000/movies'>Menu précédant</a></p>";
    }
    
    // S'il n'y a pas de titre, on update directement la watchList
    if(filter.Title == ""){
      collection.updateOne(searchWatch, updateDoc, options);
      loggerinfo.log("info", `La description est bien ajouté à la watchList dans la fonction ajoutDescription`)
      return "<h1>La description est bien ajoutée à la watchList</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>";
    }

    // S'il y a un titre, on update le film (Il faut récupérer le film et mettre la description)
    if(filter.Title != ""){
      // Liste de film
      resultFilm = result3.film;
      // On va parcourir chaque film, si le film correspond à celui recherché, on va ajouter la description à ce film
      await resultFilm.forEach((item) => {
        if(item[0] == filter.Title){
          resultFilm[i].push(filter.content)
        }
        i++
        const updateFilm = {
          $set: {
            film: resultFilm
          }
        }
    
        // On modifie la liste de film de la watchList en faisant un update
        result = collection.updateOne(searchWatch, updateFilm, options);
      });
    }

    loggerinfo.log("info", `La description est bien ajouté au Film dans la fonction ajoutDescription`)
    
    return "<h1>La description est bien ajoutée au film</h1><p>Pour retourner au menu principal : <a href='http://localhost:3000/'>Menu</a></p>";
    
  } catch(e) {
    loggererror.log("error", `Il y a une erreur dans la fonction ajoutDescription : ${e}`)
	throw e;
  }
}

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
    addFavori,
    partageWatchlist,
    ajoutDescription
};