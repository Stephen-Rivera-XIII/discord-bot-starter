const { loadEmailLists } = require('./emailListLoader.js');

// Other helper functions...
async function getEmailLists() {
  const emailLists = await loadEmailLists();
  return emailLists;
}

// Check if email is in the list
async function checkEmailList(email, emailListName) {
  const emailLists = await getEmailLists();
  const lowercaseEmail = email.trim().toLowerCase();
  const emailList = emailLists.find((list) => list.name === emailListName);
  if (emailList && emailList.emails && emailList.emails.length > 0) { // Check if emails property is defined and not empty
    const emailsArray = emailList.emails.map((str) => str.trim().toLowerCase());
    if (emailsArray.includes(lowercaseEmail)) {
      return true;
    }
  }
  console.error(`Email list not found or email address not in list!`);
  return false;
}

// Page object for role assignment functionality
const RoleAssignmentPage = {
  assignLifetimeMemberRole: async function(message, userEmail) {
    const emailLists = await getEmailLists();
    if (checkEmailList(userEmail, emailLists)) {
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
      message.reply('Sorry, your email address is not found on our list.');
    }
  },

  assignIsBenRole: async function(message, userEmail) {
    const emailLists = await getEmailLists();
    if (checkEmailList(userEmail, emailLists)) {
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
      message.reply('Sorry, your email address is not found on our list.');
    }
  },

  assignIsSarahRole: async function(message, userEmail) {const emailLists = await getEmailLists();
    if (checkEmailList(userEmail, emailLists)) {
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
      message.reply('Sorry, your email address is not found on our list.');
    }
  },
};
module.exports = {
  checkEmailList,
  RoleAssignmentPage
};
