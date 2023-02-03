//IMPORT modules needed for Discord Bot Base
const { REST, Client, GatewayIntentBits, Routes } = require('discord.js');
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

// Registering Commands, new commands go here...
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  }
];


(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Control what the commands will do...

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// DO LOGIN
client.login(process.env.CLIENT_TOKEN);
