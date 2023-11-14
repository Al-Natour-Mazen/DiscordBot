import { SlashCommandBuilder } from '@discordjs/builders';

const locateCommand = new SlashCommandBuilder()
    .setName('locate')
    .setDescription('Renvoie une réponse spécifique en fonction du choix de l\'utilisateur')
    .addStringOption(option =>
        option.setName('choice')
            .setDescription('Choix de l\'utilisateur')
            .setRequired(true)
            .setChoices(
                {
                    name: 'Glossaire',
                    value: 'gloss',
                },
                {
                    name: 'Webographie',
                    value: 'webo',
                },
                {
                    name: 'User Stories',
                    value: 'userstory',
                },
                {
                    name: 'Livraison Expression Des Besoins',
                    value: 'expBesoins',
                },

                {
                    name: 'Livraison pré-etude et conecption',
                    value: 'preconce',
                },
            ));

export default locateCommand.toJSON();