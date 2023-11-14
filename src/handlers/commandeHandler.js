// commandHandler.js
import {REST, Routes} from 'discord.js';
import QuoiCouCommande from '../commandes/quoiCommande.js'
import QuoiNathanCommande from '../commandes/nathanQuoiCommande.js'
import LocateCommande from '../commandes/locateCommande.js'
import RouletteCommande from "../commandes/rouletteCommande.js";
import PauseCommande from "../commandes/pauseCommande.js";
import {config} from "dotenv";
import fs from 'fs';


config();

const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID;
class CommandHandler {
    constructor(rest) {
        this.rest = rest;
        this.commands = [
            QuoiCouCommande,
            QuoiNathanCommande,
            LocateCommande,
            RouletteCommande,
            PauseCommande
        ];
    }

    handleInteraction = async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const commandHandlers = {
            'quoi': this.handleQuoiCommand,
            'quoi-nathan': this.handleQuoiNathanCommand,
            'locate': this.handleLocateCommand,
            'roulette-russe': this.handleRouletteCommand,
            'pause' : this.handlePauseCommand
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

    handleRouletteCommand = async (interaction) => {
        await interaction.reply("La roulette tourne... 🙊");
        let members = await interaction.guild.members.fetch();
        members = members.filter(member => !member.user.bot);
        const memberArray = [...members.values()];
        const randomMember = memberArray[Math.floor(Math.random() * memberArray.length)];

        // Lire le fichier JSON et choisir un défi au hasard
        const challenges = JSON.parse(fs.readFileSync('src/assets/challenges.json', 'utf8'));
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];

        setTimeout(async () => {
            await interaction.followUp("La roulette a trouvé quelqu'un... 🫠");
            setTimeout(async () => {
                await interaction.followUp(`${randomMember.user.toString()} a été sélectionné 😌`);
                setTimeout(async () => {
                    await interaction.followUp(`Ton défi est : ${randomChallenge} 🥵`);
                }, 2000);
            }, 2000);
        }, 2000);
    }

    handlePauseCommand = async (interaction) => {
        // Lire le fichier JSON et choisir un défi au hasard
        const PauseFile = JSON.parse(fs.readFileSync('src/assets/pauseMessages.json', 'utf8'));
        const randomMessage = PauseFile[Math.floor(Math.random() * PauseFile.length)];
        await interaction.reply(`@everyone, ${randomMessage}`);
    }

    handleLocateCommand = async (interaction) => {
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
