const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function findfilm Cette commande permet de récupérer l'ensemble des films d'une watchList
 * @param {string} id_utilisateur Il contient le nom de la watchList
 * @returns Une phrase permettant d'indiquer l'ensemble du contenu d'une watchList
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('findfilm')
        .setDescription('Permet de récupérer le contenu d\'une watchList')
        .addStringOption(option =>
            option.setName('id_utilisateur')
                .setDescription("Permet de prendre le nom d'une watchList")
                .setRequired(true)),
    
    async execute(interaction) {
        const id_utilisateur = interaction.options.getString('id_utilisateur')

        var result = "Dans la watchList '" + id_utilisateur + "' :\n";

        var options = {
            method: "GET",
            url: "http://localhost:3000/movies/findFilm/?id_utilisateur="+id_utilisateur,
        }

        axios.request(options).then(function (response) {

            var reponse = response.data[0]['film']
    
            reponse.forEach(element => {
                result += "Le film '" + element[0] + "' de '" + element[1] + "' qui est de type '" + element[2] + "' dont le status est '" + element[3] + "' est présent\n"                 
            });

            interaction.reply(result)
            
        }).catch(function (error) {
            console.error(error);
        });
    }
}