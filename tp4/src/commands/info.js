const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Réponse : input')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Veuillez choisir entre user et server')
                .setRequired(true))
        .addUserOption(option2 =>
            option2.setName('input2')
                .setDescription('Permet de prendre le nom de la personne')),
    async execute(interaction) {
        const input = interaction.options.getString("input");
        const user = interaction.options.getMember("input2");
        if(input == "user"){
            if(user != null){
                const member = await interaction.guild.members.fetch(user.id);
                await interaction.reply("Nom du membre : " + member.displayName + "\nDate d'arrivé du membre sur le serveur : " + member.joinedAt)
            }
            else
                await interaction.reply("Nom du membre : " + interaction.user.username + "\nDate d'arrivé du membre sur le serveur : " + interaction.member.joinedAt)
        }
        if(input == "server")
            await interaction.reply("Nom du serveur : " + interaction.guild.name + "\nNombre de personne : " + interaction.guild.memberCount)
    }
}