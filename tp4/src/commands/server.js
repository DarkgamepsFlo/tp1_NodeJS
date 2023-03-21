const { SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Réponse : nom du serveur et les membres'),
    async execute(interaction) {
        await interaction.reply("Nom du serveur : " + interaction.guild.name + "\nNombre de personne : " + interaction.guild.memberCount)
    },
}