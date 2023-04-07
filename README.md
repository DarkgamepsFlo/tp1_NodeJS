# TP de NodeJS

Ce projet contient l'ensemble des tp de NodeJs du S4 de BUT 2

## Création d'un bot
Rendez-vous sur le [portail développeur de Discord](https://discord.com/developers/applications).

Cliquez sur le bouton "New Application". Donnez un nom à votre bot (Node_NOM_Prénom) et cliquez sur "Create".
Vous allez arriver sur la page de votre bot. A gauche, vous pouvez voir un onglet "Bot", cliquez sur le bouton "Add Bot". Un bouton "Reset Token" va apparaître, cliquez dessus **et copiez-collez votre token dans un document texte**, celui-ci est crucial.

Après ça, rendez-vous dans l'onglet "OAuth2", et "URL generator". Sélectionnez les options *bot* et *applications.commands*. Cliquez enfin sur "Copy" et collez l'URL dans le navigateur. Sélectionnez votre serveur et ajoutez-le dessus.


#### config.json
Dans ce fichier, vous devez inclure votre *clientId* (disponible dans l'onglet *OAuth2), votre guildId (renseignez-vous pour récupérer l'ID de votre serveur) et le token récupéré précédemment.


#### Instancier le fichier app.js
Ce fichier est le fichier principal de votre bot. C'est dans celui-ci que votre bot est instancié et que celui-ci sera capable d'appeler les commandes.

```javascript
const { Client, Events, GatewayIntentBits } = require('discord.js');
const conf = require('../conf.json');
const TOKEN = conf.token;

// Créer un nouveau client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// ...

// Le token permet à votre client de se connecter à Discord
client.login(TOKEN);
```


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

Discord : Démarrer notre API
          Envoyer la requête à l'API
          
var option = {
    method = "GET",
    chemin = "localhost://moncul//etc..."
}

          Récupérer un fichier .json
          Transformer ce json en phrase ou autre

          !! Utiliser des docs et faire des tests (5 minimums)
