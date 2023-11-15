import { SlashCommandBuilder } from '@discordjs/builders';

class MaitreCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('maitre')
            .setDescription('Je suis votre maitre 🤴')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const member = await interaction.guild.members.fetch('333717460236632065'); // l'id de mamadou
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`- Que la sagesse et la lumière du ${user} éclairent notre chemin, guidant nos pas avec bienveillance et enseignements précieux 👳\n
             - inclinez vous et manifestez une vénération physique à ${user} 🧎‍♂️🧎‍♀️`);
    }
}

export default new MaitreCommand();