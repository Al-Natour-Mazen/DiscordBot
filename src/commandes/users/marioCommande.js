import { SlashCommandBuilder } from '@discordjs/builders';

class MarioCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('m-m-mariooo')
            .setDescription('Je suis votre champignon pref 🍄')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        // Lire le fichier JSON et choisir un défi au hasard
        const member = await interaction.guild.members.fetch('259734217905143809'); // l'id de mario
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`Pourquoi Mario ne fait-il jamais de blagues ? Parce que c'est toujours Luigi qui les raconte et que Mario est occupé à manger des champignons, It's Mee ${user} 🍄👨‍🔧👻`);
    }
}

export default new MarioCommand();

