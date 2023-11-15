import { SlashCommandBuilder } from '@discordjs/builders';

const quoiCommand = new SlashCommandBuilder()
    .setName('quoi')
    .setDescription('Repond avec fierté :)');

export default quoiCommand.toJSON();