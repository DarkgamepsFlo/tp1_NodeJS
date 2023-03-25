const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

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
    
            interaction.reply("La watchList : " + id_utilisateur + " est bien en favoris")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}