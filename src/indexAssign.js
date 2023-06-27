// Required packages
const { Client, IntentsBitField } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const { checkEmailList, RoleAssignmentPage } = require('./helpers.js'); // Import the checkEmailList function from helper.js
const { loadEmailLists } = require('./emailListLoader.js');
// const emailLists = await loadEmailLists();

async function main(){
// Discord client initialization
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

// Discord bot login
client.login('MTA5ODYyNzQ5MTQ3Nzg2NDUzOQ.Gk-L4t.SNXnMdh5F40RNbnb8ImaBKEp7pwwHG55MyGIBg'); //TODO this should be read in as a process.env.TOKEN

client.on('ready', (c) => {
  console.log(`✅ Logged in as ${c.user.tag}!`);
});

// Event listener for messages
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!!verifyEmail')) {
    const args = message.content.split(' ');
    const userEmail = args[1].toLocaleLowerCase();
    console.log("User email entered:", userEmail);

    // Check email against lists and assign role
    if (await checkEmailList(userEmail, 'lifeTimeMemberList')) {
      RoleAssignmentPage.assignLifetimeMemberRole(message, userEmail);
    } else if (await checkEmailList(userEmail, 'benIsBen')) {
      RoleAssignmentPage.assignIsBenRole(message, userEmail); 
    } else if (await checkEmailList(userEmail, 'sarahIsSarah')) {
      RoleAssignmentPage.assignIsSarahRole(message, userEmail);
    } else { await
      message.reply('Sorry, your email address is not on any of the lists.');
    }
  }
})
}
main();
;
