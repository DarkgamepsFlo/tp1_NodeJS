// const { SlashCommandBuilder } = require('discord.js')

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('createUser')
//         .setDescription('Permet de mettre un utilisateur dans la base de donnée')
//         .addStringOption(option =>
//             option.setName('nom')
//                 .setDescription("Permet de prendre le nom de l'utilisateur")
//                 .setRequired(true))
//         .addStringOption(option =>
//             option.setName('age')
//                 .setDescription("Permet de prendre l'age de l'utilisateur")
//                 .setRequired(true)),
//     async execute(interaction) {
//         const nom = interaction.options.getString('nom')
//         const age = interaction.options.getString('age')
//         const doc = {
//             name: nom,
//             age: age
//         }
//         var options = {
//             method: "POST",
//             chemin: "localhost:3000/users/create",
//             params: doc
//         }
//         axios.request(options).then(function (response) {
    
//             console.log(response.data);
        
//         }).catch(function (error) {
//             console.error(error);
//         });
//     }
// }