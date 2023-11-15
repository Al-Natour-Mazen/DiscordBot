import { SlashCommandBuilder } from '@discordjs/builders';

class LynaCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('mais-lyna')
            .setDescription('Encore toi, toujours de ta faute ! 😤')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const member = await interaction.guild.members.fetch('757309895430111292'); // l'id de lyna
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`Je suis ${user} et y a quoi, enfaiteee 🤨`);
    }
}

export default new LynaCommand();