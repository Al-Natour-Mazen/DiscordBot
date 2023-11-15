import { SlashCommandBuilder } from '@discordjs/builders';

const maitreCommand = new SlashCommandBuilder()
    .setName('m-m-mariooo')
    .setDescription('Je suis votre champignon pref 🍄');

export default maitreCommand.toJSON();