const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createuser')
        .setDescription('Permet de mettre un utilisateur dans la base de donnée')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription("Permet de prendre le nom de l'utilisateur")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('age')
                .setDescription("Permet de prendre l'age de l'utilisateur")
                .setRequired(true)),
    async execute(interaction) {
        const nom = interaction.options.getString('nom')
        const age = interaction.options.getString('age')

        const doc = {
            name: nom,
            age: age
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/users/create",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("L'user { nom : " + nom + ", age : " + age + "} est bien ajouté dans la base de donnée")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}