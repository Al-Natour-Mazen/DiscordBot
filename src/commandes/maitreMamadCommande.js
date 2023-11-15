import { SlashCommandBuilder } from '@discordjs/builders';

const maitreCommand = new SlashCommandBuilder()
    .setName('maitre')
    .setDescription('Je suis votre maitre 🤴');

export default maitreCommand.toJSON();