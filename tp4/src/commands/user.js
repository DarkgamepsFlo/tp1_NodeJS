const { SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Réponse : nom de user et la date arrivé'),
    async execute(interaction) {
        console.log(interaction);
        await interaction.reply("Nom du membre : " + interaction.user.username + "\nDate d'arrivé du membre : " + interaction.user.createdAt)
    }
}