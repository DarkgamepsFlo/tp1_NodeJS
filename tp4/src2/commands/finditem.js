const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('finditem')
        .setDescription('Permet de trouver un film dans la base de données')
        .addStringOption(option =>
            option.setName('title')
                .setDescription("Permet de prendre le nom d'un titre")
                .setRequired(true)),
    async execute(interaction) {
        const title = interaction.options.getString('title')
        var result = "";

        const doc = {
            Title: title
        }

        console.log(doc);

        var options = {
            method: "GET",
            url: "http://localhost:3000/movies/findItemRegistre",
            data: doc
        }

        console.log(options);

        axios.request(options).then(function (response) {

            console.log(response.data)
    
            response.data.forEach(element => {
                if(element['Title'] == title)
                    result = "Le film : " + element['Title'] + " de " + element['Year'] + " est dans la liste de film"                 
            });

            if(result == "")
                result = "L'élément n'est pas dans la liste de film"

            interaction.reply(result)
            
        }).catch(function (error) {
            console.error(error);
        });
    }
}

// Modifier pour l'orsqu'on ne met rien, on a tout les films