import { SlashCommandBuilder } from '@discordjs/builders';
import fs from "fs";

class PauseCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('pause')
            .setDescription('Une pause Café ?')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        // Lire le fichier JSON et choisir un défi au hasard
        const PauseFile = JSON.parse(fs.readFileSync('src/assets/pauseMessages.json', 'utf8'));
        const randomMessage = PauseFile[Math.floor(Math.random() * PauseFile.length)];
        await interaction.channel.send(`@everyone, ${randomMessage}`);
    }
}

export default new PauseCommand();

