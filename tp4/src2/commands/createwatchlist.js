const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createwatchlist')
        .setDescription('Permet d\'ajouter un film dans la base de données')
        .addStringOption(option =>
            option.setName('name')
                .setDescription("Permet de prendre le nom du film à ajouter")
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name')

        const doc = {
            name: name
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/users/createWatchlist",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("L'user : " + name + " possède maintenant une watchList")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}