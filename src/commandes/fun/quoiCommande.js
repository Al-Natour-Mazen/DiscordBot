import { SlashCommandBuilder } from '@discordjs/builders';

class QuoiCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('quoi')
            .setDescription('Repond avec fierté :)')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        await interaction.reply('Coube 😈');
    }
}

export default new QuoiCommand();