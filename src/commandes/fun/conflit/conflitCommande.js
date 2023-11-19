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
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        // Vérifiez que les utilisateurs ne sont pas des bots et sont différents user1.bot || user2.bot ||
        if ( user1.id === user2.id) {
            return await interaction.reply({ content: 'Les utilisateurs doivent être différents et ne pas être des bots.', ephemeral: true });
        }

        // Créez le message de sondage
        const pollMessage = await interaction.channel.send(`Qui devrait être expulsé du serveur ?\n\n👍 pour <@${user1.id}>\n\n👎 pour <@${user2.id}> \n vous avez 10 sec pour decider`);

        // Ajoutez les réactions pour le sondage
        await pollMessage.react('👍');
        await pollMessage.react('👎');

        // Initialisez les compteurs de votes
        let thumbsUp = 0;
        let thumbsDown = 0;

        // Créez un gestionnaire pour l'événement 'messageReactionAdd'
        const reactionHandler = async (reaction, user) => {
            // Ignorez les réactions des bots
            if (user.bot) return;

            // Vérifiez que la réaction est sur le bon message
            if (reaction.message.id !== pollMessage.id) return;

            // Comptez les votes
            if (reaction.emoji.name === '👍') thumbsUp++;
            else if (reaction.emoji.name === '👎') thumbsDown++;
        };

        // Ajoutez le gestionnaire à l'événement 'messageReactionAdd'
        interaction.client.on('messageReactionAdd', reactionHandler);

        // Attendez 10 secondes
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Supprimez le gestionnaire de l'événement 'messageReactionAdd'
        interaction.client.off('messageReactionAdd', reactionHandler);

        console.log(thumbsUp)
        console.log(thumbsDown)

        // Déterminez le résultat du sondage
        let result;
        if (thumbsUp > thumbsDown) {
            result = `<@${user1.id}> devrait être expulsé.`;
        } else if (thumbsDown > thumbsUp) {
            result = `<@${user2.id}> devrait être expulsé.`;
        } else {
            result = 'Le vote est à égalité.';
        }

        // Envoyez le résultat du sondage
        await interaction.channel.send(result);
    }
}

export default new ConflitCommand();
