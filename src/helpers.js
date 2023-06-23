const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Define email lists that the Discord bot will use for role assignment
// The name of each csv should correspond with the role being assigned
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
  const filePath = path.resolve(__dirname, list.path);
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

// Function to check if an email address exists on a given list
function checkEmailList(email, listName) {
  const list = emailLists.find((list) => list.name === listName);
  if (!list) {
    console.error(`Email list ${listName} not found!`);
    return false;
  }
  return list.emails.includes(email);
}

// Function to assign the Lifetime Member role
function assignLifetimeMemberRole(message, userEmail) {
  if (checkEmailList(userEmail, 'lifeTimeMemberList')) {
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
  } else {
    message.reply('Sorry, your email address is not on the lifetime member list.');
  }
}

// Function to assign the isBen role
function assignIsBenRole(message, userEmail) {
  if (checkEmailList(userEmail, 'benIsBen')) {
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
  } else {
    message.reply('Sorry, your email address is not on the lifetime member list.');
  }
}
// Function to assign the isSarah role
function assignIsSarahRole(message, userEmail) {
  if (checkEmailList(userEmail, 'sarahIsSarah')) {
    const roleName = 'isSarah';
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
  } else {
    message.reply('Sorry, your email address is not on the lifetime member list.');
  }
}

function removeUserRoles(message) {
    message.member.roles.remove(message.guild.roles.cache.filter(role => role.name !== '@everyone'))
      .then(() => {
        console.log(`User ${message.author.username} was stripped of all user roles.`);
        message.reply(`You have been stripped of all user roles.`);
      })
      .catch((error) => {
        console.error(`Error stripping user roles for ${message.author.username}:`, error);
        message.reply(`Sorry, there was an error stripping your user roles.`);
      });
  }

  
  module.exports = {
    assignLifetimeMemberRole,
    assignIsBenRole,
    assignIsSarahRole,
    removeUserRoles
  };
  