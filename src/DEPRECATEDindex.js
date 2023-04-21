// // Required packages
// const { Client, IntentsBitField} = require('discord.js');
// const Discord = require('discord.js');
// const fs = require('fs');
// const csv = require('csv-parser');
// const filePath = require("path").resolve(__dirname, "./lifeTimeMemberList.csv");
// const csv_file = fs.readFileSync(filePath,'utf-8');
// console.log("csv_file", csv_file);
// const nodemailer = require('nodemailer');

// // Discord client initialization
// const client = new Client({
//     intents: [
//         IntentsBitField.Flags.Guilds,
//         IntentsBitField.Flags.GuildMembers,
//         IntentsBitField.Flags.GuildMessages,
//         IntentsBitField.Flags.MessageContent
//     ]   
// })

// // Read email CSV file
// const emailList = [];
// fs.createReadStream(filePath)
//   .pipe(csv())
//   .on('data', (row) => {
//     emailList.push(row.email);
//   })
//   .on('end', () => {
//     console.log('Email list loaded');
//   });

// // Discord bot login
// client.login('MTA5ODYyNzQ5MTQ3Nzg2NDUzOQ.GG8MAi.snd4WLlSSI6besm5eUGaESR9NdMvuMDK0ozz-U');

// client.on('ready', (c) => {
//     console.log(`✅ Logged in as ${c.user.tag}!`);}
//     );

// // Event listener for messages
// client.on('messageCreate', async (message) => {
//     if (message.content.startsWith('!!verifyEmail')) {
//       const args = message.content.split(' ');
//       const userEmail = args[1];
//       console.log("User email entered:", userEmail);
  
//       // Check email against list
//       if (emailList.includes(userEmail)) {
//         // Assign role
//         const roleName = 'Lifetime Member';
//         const role = message.guild.roles.cache.find((r) => r.name === roleName);
//         if (!role) {
//           console.error(`Role ${roleName} not found!`);
//           message.reply(`Sorry, the ${roleName} role was not found.`);
//           return;
//         }
//         message.member.roles.add(role)
//           .then(() => {
//             console.log(`User ${message.author.username} was assigned the ${roleName} role.`);
//             message.reply(`You have been assigned the ${roleName} role!`);
//           })
//           .catch((error) => {
//             console.error(`Error assigning role ${roleName} to user ${message.author.username}:`, error);
//             message.reply(`Sorry, there was an error assigning the ${roleName} role.`);
//           });
//       } else {
//         message.reply('Sorry, your email address is not on the list.');
//       }
      
  
//         // Assign role when link is clicked
//     //     const filter = (m) => m.author.id === message.author.id;
//     //     const collector = message.channel.createMessageCollector(filter, { max: 1, time: 600000 });
//     //     message.reply('Please click the link in the verification email to become a Lifetime Member.');
//     //     collector.on('collect', (m) => {
//     //       if (m.content === '!verifyEmail') {
//     //         const role = message.guild.roles.cache.find((r) => r.name === 'Lifetime Member');
//     //         message.member.roles.add(role);
//     //         message.reply('You are now a Lifetime Member!');
//     //       } else {
//     //         message.reply('Invalid verification link.');
//     //       }
//     //     });
//     //   } else {
//     //     message.reply('Sorry, your email address is not on the list.');
//       }
//     }
// );
  
