import { SlashCommandBuilder } from '@discordjs/builders';

class ConflitCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('conflit')
            .setDescription('Lance un sondage pour déterminer quel utilisateur devrait être expulsé')
            .addUserOption(option =>
                option.setName('user1')
                    .setDescription('Premier utilisateur')
                    .setRequired(true))
            .addUserOption(option =>
                option.setName('user2')
                    .setDescription('Deuxième utilisateur')
                    .setRequired(true))
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        //  les utilisateurs ne sont pas des bots et sont différents
       if (user1.bot || user2.bot || user1.id === user2.id) {
            return await interaction.editReply({ content: 'Les utilisateurs doivent être différents et ne pas être des bots.' });
       }

        // le message de sondage
        const pollMessage = await interaction.channel.send(`Qui devrait être expulsé du serveur ?\n\n👍 pour <@${user1.id}>\n\n👎 pour <@${user2.id}>`);

        // les réactions pour le sondage
        await pollMessage.react('👍');
        await pollMessage.react('👎');
    }
}

export default new ConflitCommand();
