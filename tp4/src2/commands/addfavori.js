const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function addFavori Cette commande permet d'ajouter une watchList en favori'
 * @param {string} id_utilisateur Il contient le nom de la watchList
 * @returns Une phrase permettant d'indiquer à l'utilisateur que la watchList indiqué est bien en favori
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('addfavori')
        .setDescription('Permet d\'ajouter une watchList en favori')
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
            url: "http://localhost:3000/movies/addFavori",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("La watchList '" + id_utilisateur + "' est bien en favoris")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}