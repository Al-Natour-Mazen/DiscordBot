import { SlashCommandBuilder } from '@discordjs/builders';

class LocateCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('locate')
            .setDescription('Renvoie une réponse spécifique en fonction du choix de l\'utilisateur')
            .addStringOption(option =>
                option.setName('choice')
                    .setDescription('Choix de l\'utilisateur')
                    .setRequired(true)
                    .setChoices(
                        {
                            name: 'Glossaire',
                            value: 'gloss',
                        },
                        {
                            name: 'Webographie',
                            value: 'webo',
                        },
                        {
                            name: 'User Stories',
                            value: 'userstory',
                        },
                        {
                            name: 'Livraison Expression Des Besoins',
                            value: 'expBesoins',
                        },
                        {
                            name: 'Livraison pré-etude et conecption',
                            value: 'preconce',
                        },
                        {
                            name: 'Maquette interface',
                            value: 'maqin',
                        },
                    ))
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
        const userChoice = interaction.options.getString('choice');
        let response;

        switch(userChoice) {
            case 'gloss':
                response = ' 😁 Le glossaire se trouve ici : https://discord.com/channels/1154308104440262747/1154308104440262750/1163374624046850058';
                break
            case 'webo':
                response = ' 😁 La webographie se trouve ici : https://discord.com/channels/1154308104440262747/1154308104440262750/1168898211558211635';
                break
            case 'userstory':
                response = ' 😁 Les users Stories se trouvent ici : https://discord.com/channels/1154308104440262747/1163147950101364867/1173917754865225809';
                break;
            case 'expBesoins':
                response = ' 😁 L\'expression des besoins se trouve ici : https://discord.com/channels/1154308104440262747/1163147950101364867/1163374754045104148';
                break
            case 'preconce':
                response = ' 😁 La pré-etude et conecption se trouvent ici : https://discord.com/channels/1154308104440262747/1169664078818578552/1173898046531174400';
                break
            case 'maqin':
                response = ' 😁 La maquette de l\'interface à faire se trouve ici : https://discord.com/channels/1154308104440262747/1169664078818578552/1174381257942114314';
                break
            default:
                response = 'Choix non reconnu 🥲';
        }
        await interaction.reply(response);
    }
}

export default new LocateCommand();

