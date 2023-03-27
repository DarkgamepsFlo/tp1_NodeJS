const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function createuser Cette commande permet d'ajouter un utilisateur dans la base de données
 * @param {string} nom Il contient le nom de l'utilisateur
 * @param {string} age Il contient l'age de l'utilisateur
 * @returns Une phrase permettant d'indiquer à l'utilisateur qu'il est bien ajouté dans la base de données
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('createuser')
        .setDescription("Cette fonction permet d'ajouter un utilisateur dans la base de données")
        .addStringOption(option =>
            option.setName('nom')
                .setDescription("Contient le nom de l'utilisateur")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('age')
                .setDescription("Contient l'age de l'utilisateur")
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
    
            interaction.reply("L'user ayant comme nom : '" + nom + "' et l'age '" + age + "' est bien ajouté dans la base de données")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}