import {Client, GatewayIntentBits, REST, Routes} from 'discord.js';
import {config} from "dotenv";

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN =  process.env.DISCORD_BOT_TOKEN_ACCESS;
const CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN_ACCESS);

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'quoi') {
        await interaction.reply('Coube 😈');
    }
});
async function main(){

    const commands = [
        {
            name: 'quoi',
            description: 'Replies with Coube!',
        },
    ];

    try{
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
        });

        console.log('Successfully reloaded application (/) commands.');
         client.login(TOKEN);
    }catch (err){
        console.log(err)
    }
}

main()