const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function partagewatchlist Cette commande permet de partager une watchList avec une autre personne
 * @param {string} id_utilisateur Il contient le nom de la watchList
 * @param {string} name Il contient le nom de l'utilisateur qui va reçevoir la watchList
 * @returns Une phrase permettant d'indiquer à l'utilisateur que la watchList est bien partagé
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('partagewatchlist')
        .setDescription('Permet de partager une watchList avec une autre personne')
        .addStringOption(option =>
            option.setName('id_utilisateur')
                .setDescription("Permet de prendre le nom de la watchList")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription("Permet de prendre le nom de l'user à qui on va partager")
                .setRequired(true)),
    async execute(interaction) {
        const id_utilisateur = interaction.options.getString('id_utilisateur')
        const name = interaction.options.getString('name')

        const doc = {
            id_utilisateur: id_utilisateur,
            name: name
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/movies/partageWatch",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("La watchList '" + id_utilisateur + "' est bien partagée avec l'user '" + name + "'")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}