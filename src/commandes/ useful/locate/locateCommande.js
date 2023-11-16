import { SlashCommandBuilder } from '@discordjs/builders';
import choices from './choices.json' assert { type: 'json' };

class LocateCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('locate')
            .setDescription('Renvoie une réponse spécifique en fonction du choix de l\'utilisateur')
            .addStringOption(option =>
                option.setName('choice')
                    .setDescription('Choix de l\'utilisateur')
                    .setRequired(true)
                    .addChoices(...Object.keys(choices).map(key => ({ name: key, value: key })))
            )
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const userChoice = interaction.options.getString('choice');
        let response = choices[userChoice] || 'Choix non reconnu 🥲';
        await interaction.reply(response);
    }
}

export default new LocateCommand();
