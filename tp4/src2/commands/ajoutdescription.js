const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajoutdesc')
        .setDescription('Permet d\' ajouter une description à un film ou à une watchList')
        .addStringOption(option =>
            option.setName('id_utilisateur')
                .setDescription("Permet de prendre le nom d'une watchlist où on veut mettre un commentaire")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('content')
                .setDescription("Contenu du commentaire")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription("Permet de prendre le titre du film si on veut mettre un commentaire à un film")),
    async execute(interaction) {
        const id_utilisateur = interaction.options.getString('id_utilisateur')
        var title = interaction.options.getString('title')
        const content = interaction.options.getString('content')

        if(title == null)
            title = "";

        const doc = {
            id_utilisateur: id_utilisateur,
            Title: title,
            content: content
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/movies/addDescription",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("Le commentaire est bien renseigné")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}