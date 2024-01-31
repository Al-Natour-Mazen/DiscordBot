import { SlashCommandBuilder } from '@discordjs/builders';
import { AttachmentBuilder } from 'discord.js';
import fs from 'fs';

class GrosseTours {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('mmmhgrossetours')
            .setDescription('est ce que t\'as déjà mangé les 2 tours d\'un mec ')
            .addUserOption(option =>
                option.setName('target1')
                    .setDescription('Le mangeur')
                    .setRequired(true))
            .addUserOption(option =>
                option.setName('target2')
                    .setDescription('le mangé')
                    .setRequired(true))
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const target1 = interaction.options.getUser('target1');
        const target2 = interaction.options.getUser('target2');

        // Check if either target is a bot
        if (target1.bot || target2.bot) {
            await interaction.reply({
                content: 'Oh là là ! On dirait que tu as essayé de cibler un bot. 🤖 Les bots sont trop occupés à... botter pour participer à cette blague. 😂 Veuillez sélectionner deux membres humains. 👥',
                ephemeral: true
            });
            return;
        }
        const imageFile = 'src/commandes/fun/grosseTours/MamaTours.png';
        const attachment = new AttachmentBuilder(fs.createReadStream(imageFile));

        await interaction.reply({
            content: `${target1} ne peut pas résister à la grosse tours de ${target2} ! 🗼😏 Qui pourrait lui en vouloir ? 😈`,
            files : [attachment]
        });
    }
}

export default new GrosseTours();
