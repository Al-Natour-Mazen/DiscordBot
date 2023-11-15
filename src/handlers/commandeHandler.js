// commandHandler.js
import {REST, Routes} from 'discord.js';
import QuoiCouCommande from '../commandes/quoiCommande.js'
import QuoiNathanCommande from '../commandes/nathanQuoiCommande.js'
import LocateCommande from '../commandes/locateCommande.js'
import RouletteCommande from "../commandes/rouletteCommande.js";
import PauseCommande from "../commandes/pauseCommande.js";
import PresentationCommande from "../commandes/presentationCommande.js";
import LynaCommande from "../commandes/lynaCommande.js";
import MaitreMamadCommande from "../commandes/maitreMamadCommande.js";
import MarioCommande from "../commandes/marioCommande.js";
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
            PauseCommande,
            PresentationCommande,
            LynaCommande,
            MaitreMamadCommande,
            MarioCommande
        ];
    }

    handleInteraction = async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const commandHandlers = {
            'quoi': this.handleQuoiCommand,
            'quoi-nathan': this.handleQuoiNathanCommand,
            'locate': this.handleLocateCommand,
            'roulette-russe': this.handleRouletteCommand,
            'pause' : this.handlePauseCommand,
            'presentation' : this.handlePresentation,
            'mais-lyna' : this.handleLynaCommand,
            'maitre' : this.handleMaitreCommand,
            'm-m-mariooo' : this.handleMarioCommand
        };

        const handler = commandHandlers[interaction.commandName];
        if (handler) {
            await handler(interaction);
        }
    }

    handlePresentation = async (interaction) => {
        const presentationMessage = "Bonjour @everyone, je suis votre bot Discord ! 🤖 Je suis ici pour rendre votre expérience" +
            " sur ce serveur plus agréable et amusante ( et surout parceque Lyna a fait son interessante mais bref).\n\n " +
            "<> Voici quelques-unes des choses que je peux faire :\n\n" +
            "- Je peux vous aider à tourver les salons et document. 🧭\n" +
            "- Je peux vous donner l'envie de faire une pause. 😄\n" +
            "- Je peux lancer des défis amusants pour rendre votre journée plus intéressante. 🎲\n" +
            "- Et bien plus encore ! 🤗\n\n" +
            "N'hésitez pas à me demander de l'aide si vous voulez en savoir plus sur ce que je " +
            "peux faire. Je suis là pour vous aider 😉";

        await interaction.reply(presentationMessage);
    }
    handleQuoiCommand = async (interaction) => {
        await interaction.reply('Coube 😈');
    }

    handleQuoiNathanCommand = async (interaction) => {
        const member = await interaction.guild.members.fetch('280324992170983424'); // l'id de nathan
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`T\'es mon QuoiCouBaka (❁\´◡\`❁) ${user} , t\'es mon QuoiCouChou 😍 ${user}, t\'es mon QuoiCouSucreAuSucre 🤤 ${user}`);
    }

    handleLynaCommand = async (interaction) => {
        const member = await interaction.guild.members.fetch('757309895430111292'); // l'id de lyna
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`Je suis ${user} et y a quoi, enfaiteee 🤨`);
    }

    handleMaitreCommand = async (interaction) => {
        const member = await interaction.guild.members.fetch('333717460236632065'); // l'id de mamadou
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`- Que la sagesse et la lumière du ${user} éclairent notre chemin, guidant nos pas avec bienveillance et enseignements précieux 👳\n
             - inclinez vous et manifestez une vénération physique à ${user} 🧎‍♂️🧎‍♀️`);
    }

    handleMarioCommand = async (interaction) => {
        const member = await interaction.guild.members.fetch('259734217905143809'); // l'id de mario
        if (!member) {
            return interaction.reply('Membre non trouvé');
        }
        const user = member.user;
        await interaction.reply(`Pourquoi Mario ne fait-il jamais de blagues ? Parce que c'est toujours Luigi qui les raconte et que Mario est trop occupé à sauver la princesse et à manger des champignons géants, It's Mee ${user} 🍄👨‍🔧👻`);
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
        await interaction.channel.send(`@everyone, ${randomMessage}`);
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
