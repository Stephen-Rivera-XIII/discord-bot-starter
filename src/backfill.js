// Required packages
const { Client, IntentsBitField } = require('discord.js');
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
});

// Define email lists that the Discord bot will use for role assignment
// The name of each csv should correspond with the role being assigned
const emailLists = [
    {
        name: 'lifeTimeMemberList',
        role: 'Lifetime Member',
        path: './lifeTimeMemberList.csv',
        emails: []
    },
    {
        name: 'benIsBen',
        role: 'isBen',
        path: './benIsBen.csv',
        emails: []
    },
    {
        name: 'sarahIsSarah',
        role: 'isSarah',
        path: './sarahIsSarah.csv',
        emails: []
    }
];

// Read email addresses from CSV files and populate the corresponding emailLists arrays
emailLists.forEach((list) => {
    const filePath = require('path').resolve(__dirname, list.path);
    const csv_file = fs.readFileSync(filePath, 'utf-8');
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
client.login('MTA5ODYyNzQ5MTQ3Nzg2NDUzOQ.Gk-L4t.SNXnMdh5F40RNbnb8ImaBKEp7pwwHG55MyGIBg'); //TODO this should be read in as a process.env.TOKEN

client.on('ready', (c) => {
    console.log(`✅ Logged in as ${c.user.tag}!`);
});

// Function to assign roles to members based on email lists
function assignRoles() {
    emailLists.forEach((list) => {
        // Find the corresponding role for the list
        const roleName = list.role;
        const role = client.guilds.cache
            .map((g) => {
            console.log(`Searching for role ${roleName} in guild ${g.name}`);
            return g.roles.cache.find((r) => r.name === roleName);
            })
            .find((r) => r !== undefined);
            if (!role) {
                console.error(`Role ${roleName} not found!`);
                return;
            }

        // Check if any members should be assigned the role
        client.guilds.cache.forEach((guild) => {
            guild.members.cache.forEach((member) => {
                if (list.emails.includes(member.user.email)) {
                    if (!member.roles.cache.has(role.id)) {
                        member.roles
                            .add(role)
                            .then(() => {
                                console.log(`User ${member.user.email} was assigned the ${roleName} role.`);
                            })
                            .catch((error) => {
                                console.error(`Error assigning role ${roleName} to user ${member.user.email}:`, error);
                            });
                    }
                }
            });
        });
    });
}
client.on('message', (message) => {
    if (message.content === '!!listRoles') {
        message.guild.roles.cache.forEach((role) => {
            console.log(role.name);
        });
    }
});

// Assign roles when the bot starts up
assignRoles();

// Periodically check for new members to assign roles to
setInterval(() => {
    assignRoles();
}, 60 * 1000); // Check every minute
