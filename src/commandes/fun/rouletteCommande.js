import { SlashCommandBuilder } from '@discordjs/builders';
import fs from "fs";

class RouletteCommand {
    constructor() {
        this.commandData = new SlashCommandBuilder()
            .setName('roulette-russe')
            .setDescription('Sélectionne un utilisateur au hasard 😏')
            .toJSON();

        this.handleCommand = this.handleCommand.bind(this);
    }

    async handleCommand(interaction) {
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
}

export default new RouletteCommand();

