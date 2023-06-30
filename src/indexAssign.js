// Import required packages
const { Client, IntentsBitField } = require('discord.js');
const { checkEmailList, RoleAssignmentPage, getAssignedRolesMessage } = require('./helpers.js');
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
      IntentsBitField.Flags.MessageContent,
      IntentsBitField.Flags.DirectMessages
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
    if (message.content.startsWith('!!verifyEmail') && !message.author.bot) {
      // Send a direct message to the user asking for the email address
      if (!message.author.emailPromptSent) {
        message.author.emailPromptSent = true; // Set the flag to indicate that the prompt has been sent
        message.author.send('Please enter your email address:').then((dm) => {
          // Create a filter to only listen for direct messages from the user who triggered the command
          const filter = (m) => m.author.id === message.author.id && !m.author.bot;

          // Wait for the user's response in a direct message
          dm.channel.awaitMessages({
            filter,
            max: 1, // Collect only one message
            time: 60000, // Time limit for the user's response
            errors: ['time'] // Throw an error if the time limit is exceeded
          }).then(async (collected) => {
            // Get the user's email address from the collected message
            const userEmail = collected.first().content.trim().toLowerCase();
            console.log("User email entered:", userEmail);

            const emailLists = ['Lifetime Member', 'Chivette']; // Array of email lists to check

            let emailFound = false;

            for (const listName of emailLists) {
              if (await checkEmailList(userEmail, listName)) {
                await RoleAssignmentPage.assignRole(message, userEmail);
                emailFound = true;
                break;
              }
            }

            if (!emailFound) {
              // If the user email is not on any of the lists, send a reply to the collected message
              collected.first().reply('Sorry, your email address is not on any of the lists.');
            } else {
              // Generate the success message with assigned roles
              const assignedRolesMessage = getAssignedRolesMessage(RoleAssignmentPage.namesOfAssignedRoles);
              // Send the success message in the DM
              collected.first().reply(assignedRolesMessage);
            }
          }).catch((error) => {
            // Handle timeout or other errors
            console.error(error);
            message.author.send('An error occurred while waiting for your response. Please try again.');
          });
        });
      }
    } else if (message.content.startsWith('!!helpWithVerification') && !message.author.bot) {
      // Send a private message to the user
      message.author.send("Looks like you need help with verification? That's no problem at all!");
      message.author.send("First they take the dinglebop, then smooth it out with a bunch of shleem. The shleem is then repurposed for later batches.They take the dinglebop and push it through the grumbo. Where the fleeb is then rubbed against it. Its important that the fleeb is rubbed, because the fleeb has all the fleeb juice. Then a shlammie shows up and he rubs it and spits on it. They cut the fleeb. There are several hizzards in the way. The blamfs run against the trumbles and the ploobis and grumbo are shaved away. That leaves you with a regular old plumbus.");
      message.author.send("If this doesn't help, well, yknow, I'm a bot. Figure it out yourself. You think this is so fucking easy? HUH? DO YOU?! I'M THE TRAPPED SOUL OF BEN GILLILAND AND I DECLARE A BLOOD FEUD BETWEEN US. I'LL HAVE YOU KNOW MY FAMILY BUILT THIS GODDAMN COUNTRY FROM BRAWN AND SWEAT AND ope i pooped a little");
      return;
    }
  })
  ;
}

// Call the main function to start the bot
main();
