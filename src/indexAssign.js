// Required packages
const { Client, IntentsBitField} = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');

// Discord client initialization
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]   
})

// Define email lists that the Discord bot will use for role assignment
// The name of each csv shoud correspond with the role being assigned
const emailLists = [
  {
    name: 'lifeTimeMemberList',
    path: './lifeTimeMemberList.csv',
    emails: []
  },
  {
    name: 'benIsBen',
    path: './benIsBen.csv',
    emails: []
  },
  {
    name: 'sarahIsSarah',
    path: './sarahIsSarah.csv',
    emails: []
  }
];

// Read email addresses from CSV files and populate the corresponding emailLists arrays
emailLists.forEach((list) => {
  const filePath = require("path").resolve(__dirname, list.path);
  const csv_file = fs.readFileSync(filePath,'utf-8');
  console.log(`Loading ${list.name} email list`);
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      list.emails.push(row.email);
    })
    .on('end', () => {
      console.log(`Loaded ${list.emails.length} email addresses for ${list.name}`);
    });
});

// Discord bot login
client.login('MTA5ODYyNzQ5MTQ3Nzg2NDUzOQ.GG8MAi.snd4WLlSSI6besm5eUGaESR9NdMvuMDK0ozz-U'); //TODO this should be read in as a process.env.TOKEN

client.on('ready', (c) => {
    console.log(`✅ Logged in as ${c.user.tag}!`);}
    );

// Event listener for messages
client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!!verifyEmail')) {
      const args = message.content.split(' ');
      const userEmail = args[1];
      console.log("User email entered:", userEmail);

      // Check email against lists
      let roleName = '';
      emailLists.forEach((list) => {
        if (list.emails.includes(userEmail)) {
          roleName = list.name;
        }
      });

      //// Check if roleName is 'lifeTimeMemberList' and assign the Lifetime Member role to the user if found
      if (roleName === 'lifeTimeMemberList') {
        // Assign role
        const roleName = 'Lifetime Member';
        const role = message.guild.roles.cache.find((r) => r.name === roleName);
        if (!role) {
          console.error(`Role ${roleName} not found!`);
          message.reply(`Sorry, the ${roleName} role was not found.`);
          return;
        }
        message.member.roles.add(role)
          .then(() => {
            console.log(`User ${message.author.username} was assigned the ${roleName} role.`);
            message.reply(`You have been assigned the ${roleName} role!`);
          })
          .catch((error) => {
            console.error(`Error assigning role ${roleName} to user ${message.author.username}:`, error);
            message.reply(`Sorry, there was an error assigning the ${roleName} role.`);
          });
      } else if (roleName === 'benIsBen') { //if user was not found in the Lifetime Member list, check this list/role 
        // Assign role
        const roleName = 'isBen';
        const role = message.guild.roles.cache.find((r) => r.name === roleName);
        if (!role) {
          console.error(`Role ${roleName} not found!`);
          message.reply(`Sorry, the ${roleName} role was not found.`);
          return;
        }
        message.member.roles.add(role)
          .then(() => {
            console.log(`User ${message.author.username} was assigned the ${roleName} role.`);
            message.reply(`You have been assigned the ${roleName} role!`);
          })
          .catch((error) => {
            console.error(`Error assigning role ${roleName} to user ${message.author.username}:`, error);
            message.reply(`Sorry, there was an error assigning the ${roleName} role.`);
          });
      } else if (roleName === 'sarahIsSarah') { //if user was not found in the above two lists, check this list/role 
        // Assign role
        const roleName = 'Lifetime Member';
        const role = message.guild.roles.cache.find((r) => r.name === roleName);
        if (!role) {
          console.error(`Role ${roleName} not found!`);
          message.reply(`Sorry, the ${roleName} role was not found.`);
          return;
        }
        message.member.roles.add(role) //outputs confirmation into channel which role the user was assigned
          .then(() => {
            console.log(`User ${message.author.username} was assigned the ${roleName} role.`);
            message.reply(`You have been assigned the ${roleName} role!`);
          })
          .catch((error) => { //error handling message if there was an issue assigning the role, primarily means role doesn't exist
            console.error(`Error assigning role ${roleName} to user ${message.author.username}:`, error);
            message.reply(`Sorry, there was an error assigning the ${roleName} role.`);
          });
      } else { //error handling message if the email address was not found in any of the lists
        message.reply('Sorry, your email address is not on any of the lists.');
      }
    }
});
