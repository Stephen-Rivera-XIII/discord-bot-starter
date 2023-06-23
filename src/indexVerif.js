// Required packages
const { Client, IntentsBitField} = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const csv = require('csv-parser');
const filePath = require("path").resolve(__dirname, "./emailList.csv");
const csv_file = fs.readFileSync(filePath,'utf-8');
console.log("csv_file", csv_file);
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

// Read email CSV file
const emailList = [];
fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    emailList.push(row.email);
  })
  .on('end', () => {
    console.log('Email list loaded');
  });

// Discord bot login
client.login('MTA5ODYyNzQ5MTQ3Nzg2NDUzOQ.Gk-L4t.SNXnMdh5F40RNbnb8ImaBKEp7pwwHG55MyGIBg');

client.on('ready', (c) => {
    console.log(`✅ Logged in as ${c.user.tag}!`);}
    );

// Event listener for messages
client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!!!verifyEmail')) {
      const args = message.content.split(' ');
      const userEmail = args[1];
      console.log("User email entered:", userEmail);
  
      // Check email against list
      if (emailList.includes(userEmail)) {
        // Send verification email
        console.log("Email address found. Initiating email verification.");
        console.log(emailList)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'SRiveraTestBot',
            pass: 'eyhtswjjobuybxjc',
          },
        });
        const mailOptions = {
          from: 'SRiveraTestBot@gmail.com',
          to: userEmail,
          subject: 'Verify your email address',
          text: 'Please click the following link to verify your email address: https://example.com/verifyEmail',
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
  
        // Assign role when link is clicked
        const filter = (m) => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 600000 });
        message.reply('Please click the link in the verification email to become a Lifetime Member.');
        collector.on('collect', (m) => {
          if (m.content === '!verifyEmail') {
            const role = message.guild.roles.cache.find((r) => r.name === 'Lifetime Member');
            message.member.roles.add(role);
            message.reply('You are now a Lifetime Member!');
          } else {
            message.reply('Invalid verification link.');
          }
        });
      } else {
        message.reply('Sorry, your email address is not on the list.');
      }
    }
  });
  