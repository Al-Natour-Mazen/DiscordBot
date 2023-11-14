import { SlashCommandBuilder } from '@discordjs/builders';

const pauseCommand = new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Une pause Café ?');

export default pauseCommand.toJSON();