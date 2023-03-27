const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function deletewatchlist Cette commande permet de supprimer une watchlist de la base de données
 * @param {string} id_utilisateur Il contient le nom de la watchList à supprimer
 * @returns Une phrase permettant d'indiquer à l'utilisateur que la watchlist est bien supprimé
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletewatchlist')
        .setDescription('Permet de supprimer une watchList de la base de données')
        .addStringOption(option =>
            option.setName('id_utilisateur')
                .setDescription("Permet de prendre le nom de la watchList")
                .setRequired(true)),
    async execute(interaction) {
        const id_utilisateur = interaction.options.getString('id_utilisateur')

        const doc = {
            id_utilisateur: id_utilisateur,
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/movies/deleteWatchList",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("La watchList '" + id_utilisateur + "' est bien supprimée de la base de données")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}