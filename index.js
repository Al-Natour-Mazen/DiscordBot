// main.js
import {Client, GatewayIntentBits, REST} from 'discord.js';
import {config} from "dotenv";
import CommandHandler from './src/handlers/commandeHandler.js'

config();

const TOKEN =  process.env.DISCORD_BOT_TOKEN_ACCESS;


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN_ACCESS);

const commandHandler = new CommandHandler(rest);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', commandHandler.handleInteraction);

async function main(){
    await commandHandler.registerCommands();
    client.login(TOKEN);
}

main()
