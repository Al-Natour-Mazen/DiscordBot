// commandHandler.js
import {REST, Routes} from 'discord.js';
import QuoiCouCommande from '../commandes/fun/quoiCommande.js'
import QuoiNathanCommande from '../commandes/users/nathanQuoiCommande.js';
import LocateCommande from '../commandes/useful/locate/locateCommande.js'
import RouletteCommande from "../commandes/fun/roulette/rouletteCommande.js";
import PauseCommande from "../commandes/fun/pause/pauseCommande.js";
import PresentationCommande from "../commandes/useful/presentationCommande.js";
import LynaCommande from "../commandes/users/lynaCommande.js";
import MaitreMamadCommande from "../commandes/users/maitreMamadCommande.js";
import MarioCommande from "../commandes/users/marioCommande.js";
import AddNewLocationCommande from "../commandes/useful/locate/addNewLocationCommande.js";
import ConvocationCommande from "../commandes/fun/convocation/convocationCommande.js";
import ConflitCommande from "../commandes/fun/conflit/conflitCommande.js";
import MazenCommande from "../commandes/users/mazenCommande.js";
import WalidCommande from "../commandes/users/walidCommande.js";
import {config} from "dotenv";


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
            MarioCommande,
            AddNewLocationCommande,
            ConvocationCommande,
            ConflitCommande,
            MazenCommande,
            WalidCommande
        ];
    }

    handleInteraction = async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const commandHandlers = {
            'quoi': QuoiCouCommande.handleCommand,
            'quoi-nathan': QuoiNathanCommande.handleCommand,
            'locate': LocateCommande.handleCommand,
            'roulette-russe': RouletteCommande.handleCommand,
            'pause' : PauseCommande.handleCommand,
            'presentation' : PresentationCommande.handleCommand,
            'mais-lyna' : LynaCommande.handleCommand,
            'maitre' : MaitreMamadCommande.handleCommand,
            'm-m-mariooo' : MarioCommande.handleCommand,
            'addnewlocation': AddNewLocationCommande.handleCommand,
            'convocation': ConvocationCommande.handleCommand,
            'conflit': ConflitCommande.handleCommand,
            'mazennn': MazenCommande.handleCommand,
            'waleed': WalidCommande.handleCommand
        };

        const handler = commandHandlers[interaction.commandName];
        if (handler) {
            await handler(interaction);
        }
    }


    async registerCommands() {
        try{
            console.log('Started refreshing application (/) commands.');

            const commandData = this.commands.map(command => command.commandData);
            await this.rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: commandData
            });

            console.log('Successfully reloaded application (/) commands.');
        }catch (err){
            console.log(err)
        }
    }
}

export default CommandHandler;
