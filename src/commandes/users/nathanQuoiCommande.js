// quoiNathanCommande.js
import { SlashCommandBuilder } from '@discordjs/builders';

class QuoiNathanCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('quoi-nathan')
            .setDescription('Repond à la Nathan :)')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const member = await interaction.guild.members.fetch('280324992170983424'); // l'id de nathan
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`T'es mon QuoiCouBaka (❁\´◡\`❁) ${user} , t'es mon QuoiCouChou 😍 ${user}, t'es mon QuoiCouSucreAuSucre 🤤 ${user}`);
    }
}

export default new QuoiNathanCommand();