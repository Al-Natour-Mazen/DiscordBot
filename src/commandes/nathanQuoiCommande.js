import { SlashCommandBuilder } from '@discordjs/builders';

const quoiNathanCommand = new SlashCommandBuilder()
    .setName('quoi-nathan')
    .setDescription('Repond Coube à la Nathan :)');

export default quoiNathanCommand.toJSON();