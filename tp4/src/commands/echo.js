const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Réponse : input').
        addStringOption(option =>
            option.setName('input')
                .setDescription('Permet de prendre le paramètre')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString('input')
        await interaction.reply(input)
    }
}