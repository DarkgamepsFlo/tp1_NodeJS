const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function deleteitem Cette commande permet d'enlever un film d'une watchList
 * @param {string} id_utilisateur Il contient le nom de la watchList
 * @param {string} titre Il contient le nom du film à effacer
 * @returns Une phrase permettant d'indiquer à l'utilisateur que le film est bien effacé de la watchList
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteitem')
        .setDescription('Permet de supprimer un film d\'une watchList')
        .addStringOption(option =>
            option.setName('id_utilisateur')
                .setDescription("Permet de prendre le nom de la watchList")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('titre')
                .setDescription("Permet de prendre le film à supprimer")
                .setRequired(true)),
    async execute(interaction) {
        const id_utilisateur = interaction.options.getString('id_utilisateur')
        const titre = interaction.options.getString('titre')

        const doc = {
            id_utilisateur: id_utilisateur,
            titre: titre
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/movies/deleteItem",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("Le film '" + titre + "' est bien supprimé de la watchList '" + id_utilisateur + "'")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}