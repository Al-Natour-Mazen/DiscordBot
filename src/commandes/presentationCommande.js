import { SlashCommandBuilder } from '@discordjs/builders';

const presentationCommand = new SlashCommandBuilder()
    .setName('presentation')
    .setDescription('Je suis qui ? 🤔');

export default presentationCommand.toJSON();