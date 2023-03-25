const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('updatestatus')
        .setDescription('Permet de modifier le status d\'un film')
        .addStringOption(option =>
            option.setName('id_utilisateur')
                .setDescription("Permet de prendre le nom d'une waychlist")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('titlefilm')
                .setDescription("Permet de prendre le titre du film dont on va changer le status")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('status')
                .setDescription("Permet de prendre le nouveau status")
                .setRequired(true)),
    async execute(interaction) {
        const id_utilisateur = interaction.options.getString('id_utilisateur')
        const titlefilm = interaction.options.getString('titlefilm')
        const status = interaction.options.getString('status')

        const doc = {
            id_utilisateur: id_utilisateur,
            titlefilm: titlefilm,
            status: status
        }

        console.log(doc);

        var options = {
            method: "POST",
            url: "http://localhost:3000/movies/updatestatus",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("Le film : " + titlefilm + " dans la watchList : " + id_utilisateur + " a comme nouveau status : " + status)
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}