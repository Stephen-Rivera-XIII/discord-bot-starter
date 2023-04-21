const assert = require('assert');
const { Client, IntentsBitField} = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]   
})

describe('Discord bot', function() {
  // Define a timeout of 10 seconds for each test
  this.timeout(10000);

  // Test the client initialization
  describe('Client', function() {
    it('should initialize the Discord client with the correct intents', function() {
      const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent
        ]
      });
      assert.ok(client instanceof Client);
    });
  });

  // Test the email list loading
  describe('Email lists', function() {
    it('should load the email lists correctly', function() {
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

      emailLists.forEach((list) => {
        const filePath = require("path").resolve(__dirname, list.path);
        const csv_file = fs.readFileSync(filePath,'utf-8');
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
            list.emails.push(row.email);
          })
          .on('end', () => {
            assert.ok(list.emails.length > 0);
          });
      });
    });
  });

  // Test the role assignment
  describe('Role assignment', function() {
    const message = {
      content: '!!verifyEmail test@example.com',
      member: {
        roles: {
          add: function(role) {
            assert.equal(role.name, 'Lifetime Member');
            return Promise.resolve();
          }
        }
      },
      guild: {
        roles: {
          cache: [
            { name: 'Lifetime Member' }
          ]
        }
      },
      author: {
        username: 'Test User'
      },
      reply: function(text) {
        assert.equal(text, 'You have been assigned the Lifetime Member role!');
      }
    };

    it('should assign the Lifetime Member role for a valid email', function() {
      message.content = '!!verifyEmail test@example.com';
      client.emit('messageCreate', message);
    });

    it('should give an error message for an invalid role', function() {
      message.content = '!!verifyEmail invalid@example.com';
      message.reply = function(text) {
        assert.equal(text, 'Sorry, there was an error assigning the role.');
      };
      client.emit('messageCreate', message);
    });
  });
});
