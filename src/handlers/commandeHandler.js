// commandHandler.js
import {REST, Routes} from 'discord.js';
import QuoiCouCommande from '../commandes/quoiCommande.js'
import QuoiNathanCommande from '../commandes/nathanQuoiCommande.js'
import LocateCommande from '../commandes/locateCommande.js'
import {config} from "dotenv";

config();

const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID;
class CommandHandler {
    constructor(rest) {
        this.rest = rest;
        this.commands = [
            QuoiCouCommande,
            QuoiNathanCommande,
            LocateCommande
        ];
    }

    handleInteraction = async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const commandHandlers = {
            'quoi': this.handleQuoiCommand,
            'quoi-nathan': this.handleQuoiNathanCommand,
            'locate': this.handleLocateCommand
        };

        const handler = commandHandlers[interaction.commandName];
        if (handler) {
            await handler(interaction);
        }
    }

    handleQuoiCommand = async (interaction) => {
        await interaction.reply('Coube 😈');
    }

    handleQuoiNathanCommand = async (interaction) => {
        await interaction.reply('T\'es mon QuoiCouBaka, t\'es mon QuoiCouChou, t\'es mon QuoiCouSucreAuSucre 🤤');
    }

    handleLocateCommand = async (interaction) => {
        const userChoice = interaction.options.getString('choice');
        let response;

        console.log(userChoice)

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
                response = ' 😁 L\'Expression des Besoins se trouve ici : https://discord.com/channels/1154308104440262747/1163147950101364867/1163374754045104148';
                break
            case 'preconce':
                response = ' 😁 L\'Expression des Besoins se trouve ici : https://discord.com/channels/1154308104440262747/1163147950101364867/1163374754045104148';
                break
            default:
                response = 'Choix non reconnu 🥲';
        }
        await interaction.reply(response);
    }

    async registerCommands() {
        try{
            console.log('Started refreshing application (/) commands.');

            await this.rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: this.commands
            });

            console.log('Successfully reloaded application (/) commands.');
        }catch (err){
            console.log(err)
        }
    }
}

export default CommandHandler;
