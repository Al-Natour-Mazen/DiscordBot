import { SlashCommandBuilder } from '@discordjs/builders';
import { AttachmentBuilder } from 'discord.js';
import fs from 'fs';

class SeFaireSoulever {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('y_a_agnes')
            .setDescription('Agnes arrive avec un soulevé de terre ! Accrochez-vous à vos haltères ! 💪😂')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const audioFile = 'src/commandes/fun/seFaireSoulever/Aie_ça_fait_mal.m4a';
        const attachment = new AttachmentBuilder(fs.createReadStream(audioFile));
        await interaction.reply({ files: [attachment] });
    }
}

export default new SeFaireSoulever();
