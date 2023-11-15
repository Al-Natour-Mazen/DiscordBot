import { SlashCommandBuilder } from '@discordjs/builders';

const lynaCommand = new SlashCommandBuilder()
    .setName('mais-lyna')
    .setDescription('Encore toi, toujours de ta faute ! 😤');

export default lynaCommand.toJSON();