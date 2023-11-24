// mazenCommande.js
import { SlashCommandBuilder } from '@discordjs/builders';

class MazenCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('mazennn')
            .setDescription('Soyez comme mazen 🦓')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const member = await interaction.guild.members.fetch('689184005937168499'); // l'id de mazen
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`je suis Zen 🧘‍♂️, je suis ${user} `);
    }
}

export default new MazenCommand();