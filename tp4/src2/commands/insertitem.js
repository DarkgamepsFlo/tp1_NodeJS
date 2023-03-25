const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('insertitem')
        .setDescription('Permet d\'ajouter un film dans une watchlist')
        .addStringOption(option =>
            option.setName('id_utilisateur')
                .setDescription("Permet de prendre le nom d'une waychlist")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription("Permet de prendre le titre d'un film")
                .setRequired(true)),
    async execute(interaction) {
        const id_utilisateur = interaction.options.getString('id_utilisateur')
        const Title = interaction.options.getString('title')

        const doc = {
            id_utilisateur: id_utilisateur,
            Title: Title
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/movies/insertItem",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("Le film : " + Title + " est bien ajouté dans la watchList : " + id_utilisateur)
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}