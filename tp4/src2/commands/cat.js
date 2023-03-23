const { SlashCommandBuilder } = require('discord.js')
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Permet de montrer une photo de cat'),
    async execute(interaction) {
        const catResult = await request('https://aws.random.cat/meow')
        const { file } = JSON.parse(await catResult.body.text())
                
        await interaction.reply({ files: [file] })
    },
}