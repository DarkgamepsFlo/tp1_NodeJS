const { SlashCommandBuilder } = require('discord.js')
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Permet de montrer la définition de son nom dans urban dictionnary')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Veuillez choisir le nom')
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString("name");
        const urbanResult = await request('https://api.urbandictionary.com/v0/define?term=' + name)
        const { list } = JSON.parse(await urbanResult.body.text())
                
        // Essayer de lister l'ensemble des définitions
        await interaction.reply(list[0].definition)
    },
}