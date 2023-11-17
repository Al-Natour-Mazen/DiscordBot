import { SlashCommandBuilder } from '@discordjs/builders';
import fs from "fs";

class ConvocationCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('convocation')
            .setDescription('Convocation d\'un utilisateur avec une certaine gravite')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('L\'utilisateur a convoquer')
                    .setRequired(true))
            .addIntegerOption(option =>
                option.setName('severity')
                    .setDescription('La gravite de la convocation de 1 -> 5')
                    .setRequired(false))
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const user = interaction.options.getUser('user');
        let severity = interaction.options.getInteger('severity');
        if (!severity) {
            severity = 1;
        }
        severity = Math.min(Math.max(severity, 1), 4);

        // Lire le fichier JSON
        const convocationMessages = JSON.parse(fs.readFileSync('src/commandes/fun/convocation/convocationMsgs.json', 'utf8'));

        // Choisir un message de convocation au hasard
        const convocationMessage = convocationMessages[Math.floor(Math.random() * convocationMessages.length)];

        let finalMessage = '';
        for (let i = 0; i < severity; i++) {
            finalMessage += `<@${user.id}> est convoque. ${convocationMessage}\n`;
        }

        await interaction.reply(finalMessage);
    }
}

export default new ConvocationCommand();
