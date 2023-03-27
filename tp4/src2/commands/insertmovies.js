const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function insertmovies Cette commande permet d'insérer un film dans la base de données
 * @param {string} s Il contient le nom du film
 * @param {string} apikey Il contient le numéro de la clé de tmdb
 * @returns Une phrase permettant d'indiquer à l'utilisateur que le film est bien ajouté dans la base de données
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('insertmovies')
        .setDescription('Cette commande permet d\'ajouter un film dans la base de données')
        .addStringOption(option =>
            option.setName('s')
                .setDescription("Permet de prendre le nom du film à ajouter")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('apikey')
                .setDescription("Permet de prendre l'apikey de l'utilisateur'")
                .setRequired(true)),
    async execute(interaction) {
        const s = interaction.options.getString('s')
        const apikey = interaction.options.getString('apikey')

        const doc = {
            s: s,
            apikey: apikey
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/movies/insertMovie",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("Le film '" + s + "' est bien ajouté dans la base de donnée")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}