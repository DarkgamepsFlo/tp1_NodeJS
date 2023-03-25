const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('finduser')
        .setDescription('Permet de lister l\'ensemble des utilisateur'),
    async execute(interaction) {
        var result = ""

        var options = {
            method: "GET",
            url: "http://localhost:3000/users/findUser",
        }

        axios.request(options).then(function (response) {

            console.log(response.data)
    
            response.data.forEach(element => {
                result += "L'user : " + element['name'] + " est présent dans la base de données\n"                 
            });

            interaction.reply(result)
            
        }).catch(function (error) {
            console.error(error);
        });
    }
}

// Modifier pour l'orsqu'on ne met rien, on a tout les films