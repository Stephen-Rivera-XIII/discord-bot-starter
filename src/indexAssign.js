// Import required packages
const { Client, IntentsBitField } = require('discord.js');
const { checkEmailList, RoleAssignmentPage } = require('./helpers.js');
const { config } = require('dotenv');

// Load environment variables from .env file
config();

// Main function
async function main() {
  // Create a new Discord client with specified intents
  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent
    ]
  });

  // Log in the Discord bot using the BOT_TOKEN environment variable
  client.login(process.env.BOT_TOKEN);

  // Event listener for when the bot is ready
  client.on('ready', (c) => {
    console.log(`✅ Logged in as ${c.user.tag}!`);
  });

  // Event listener for incoming messages
  client.on('messageCreate', async (message) => {
    // Check if the message starts with the command !!verifyEmail
    if (message.content.startsWith('!!verifyEmail')) {
      // Extract the user email from the message arguments
      const args = message.content.split(' ');
      const userEmail = args[1].toLocaleLowerCase();
      console.log("User email entered:", userEmail);

      // Check if the user email is on the lifeTimeMemberList and assign the appropriate role
      if (await checkEmailList(userEmail, 'lifeTimeMemberList')) {
        RoleAssignmentPage.assignRole(message, userEmail);
      } else {
        // If the user email is not on any of the lists, reply with a message
        message.reply('Sorry, your email address is not on any of the lists.');
      }
    }
  });
}

// Call the main function to start the bot
main();
