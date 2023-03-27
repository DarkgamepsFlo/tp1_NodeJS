const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function findwatchlist Cette commande permet d'afficher l'ensemble des watchLists d'un utilisateur'
 * @param {string} name Il contient le nom de l'utilisateur
 * @returns Une phrase permettant d'indiquer l'ensemble des watchLists de l'utilisateur
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('findwatchlist')
        .setDescription('Permet d\'afficher l\'ensemble des watchList d\'un utilisateur')
        .addStringOption(option =>
            option.setName('name')
                .setDescription("Permet de prendre le nom d'un utilisateur")
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name')
        var result = "L'user '" + name + "' possède une watchList contenant : \n";

        var options = {
            method: "GET",
            url: "http://localhost:3000/movies/findWatch?name="+name,
        }

        axios.request(options).then(function (response) {

            console.log(response.data)

            var reponse = response.data[0]['watchlist']
    
            reponse.forEach(element => {
                result += element                 
            });

            interaction.reply(result)
            
        }).catch(function (error) {
            console.error(error);
        });
    }
}