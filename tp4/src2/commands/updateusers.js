const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

/**
 * @function updateusers Cette commande permet de modifier les informations d'un utilisateur
 * @param {string} nom_ancien Il contient le nom de l'utilisateur
 * @param {string} nom_nouveau Il contient le nouveau prénom de l'utilisateur (ou _ si on ne veut pas le modifier)
 * @param {string} year_nouveau Il contient le nouvel age de l'utilisateur (ou _ si on ne veut pas le modifier)
 * @returns Une phrase permettant d'indiquer à l'utilisateur que les infos de l'utilisateur sont bien modifié dans la base de données
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('updateusers')
        .setDescription('Permet de modifier les informations d\'un user')
        .addStringOption(option =>
            option.setName('nom_ancien')
                .setDescription("Permet de prendre le nom d'une waychlist")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nom_nouveau')
                .setDescription("Permet de prendre le titre du film dont on va changer le status ('_' pour laisser vide)")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('year_nouveau')
                .setDescription("Permet de prendre le nouveau status ('_' pour laisser vide)")
                .setRequired(true)),
    async execute(interaction) {
        const nom_ancien = interaction.options.getString('nom_ancien')
        const nom_nouveau = interaction.options.getString('nom_nouveau')
        const year_nouveau = interaction.options.getString('year_nouveau')

        const doc = {
            nomAncien: nom_ancien,
            nomNouveau: nom_nouveau,
            yearNouveau: year_nouveau
        }

        var options = {
            method: "POST",
            url: "http://localhost:3000/users/updateUser",
            data: doc
        }

        axios.request(options).then(function () {
    
            interaction.reply("L'user' '" + nom_ancien + "' est bien modifé")
        
        }).catch(function (error) {
            console.error(error);
        });
    }
}

// Préciser le nouveau nom, nouvel age ou les deux