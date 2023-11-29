// mazenCommande.js
import { SlashCommandBuilder } from '@discordjs/builders';

class WalidCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('waleed')
            .setDescription('I\'ll be there soon 🐢')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const member = await interaction.guild.members.fetch('326900142039105536'); // l'id de walid
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`je suis Là !! || NON enfaite je deconne, je suis ${user} 💩 ||`);
    }
}

export default new WalidCommand();