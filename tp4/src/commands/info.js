const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Réponse : input').
        addStringOption(option =>
            option.setName('input')
                .setDescription('Permet de prendre le paramètre')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString("input")
        if(input == "user")
            await interaction.reply("Nom du membre : " + interaction.user.username + "\nDate d'arrivé du membre : " + interaction.user.createdAt)
        if(input == "server")
            await interaction.reply("Nom du serveur : " + interaction.guild.name + "\nNombre de personne : " + interaction.guild.memberCount)
        else
            await interaction.reply("Veuillez choisir server ou user")
    }
}