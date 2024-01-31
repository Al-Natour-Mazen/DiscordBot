import { SlashCommandBuilder } from '@discordjs/builders';

class PresentationCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('presentation')
            .setDescription('Je suis qui ? 🤔')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const presentationMessage = "Bonjour @everyone, je suis votre bot Discord ! 🤖 Je suis ici pour rendre votre expérience" +
            " sur ce serveur plus agréable et amusante ( et surout parceque Lyna a fait son interessante mais bref).\n\n " +
            "<> Voici quelques-unes des choses que je peux faire :\n\n" +
            "- Je peux vous aider à tourver les salons et document. 🧭\n" +
            "- Je peux vous donner l'envie de faire une pause. 😄\n" +
            "- Je peux lancer des défis amusants pour rendre votre journée plus intéressante. 🎲\n" +
            "- Et bien plus encore ! 🤗\n" +
            "- Retrouvez mon code source ici : https://github.com/Al-Natour-Mazen/DiscordBot ©️\n\n" +
            "N'hésitez pas à me demander de l'aide si vous voulez en savoir plus sur ce que je " +
            "peux faire. Je suis là pour vous aider 😉";

        await interaction.channel.send(presentationMessage);
    }
}

export default new PresentationCommand();




