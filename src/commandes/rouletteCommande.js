import { SlashCommandBuilder } from '@discordjs/builders';

const rouletteCommand = new SlashCommandBuilder()
    .setName('roulette-russe')
    .setDescription('Sélectionne un utilisateur au hasard 😏');

export default rouletteCommand.toJSON();