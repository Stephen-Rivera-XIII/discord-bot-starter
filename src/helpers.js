const { loadEmailLists } = require('./emailListLoader.js');

// Other helper functions...
let emailLists;

async function getEmailLists() {
  if (!emailLists) {
    emailLists = await loadEmailLists();
  }
  return emailLists;
}

// Check if email is in the list
async function checkEmailList(email, emailListName) {
  const lowercaseEmail = email.trim().toLowerCase();
  const emailLists = await getEmailLists();
  const emailList = emailLists.find((list) => list.name === emailListName);
  if (emailList && emailList.emails) {
    const emailsArray = emailList.emails.map((str) => str.trim().toLowerCase());
    if (emailsArray.includes(lowercaseEmail)) {
      return true;
    }
  }
  return false;
}

// Page object for role assignment functionality
const RoleAssignmentPage = {
  assignRole: async function(message, userEmail) {
    const emailLists = await getEmailLists();
    let assignedRole = false; // Flag variable to track if a role has been assigned

    if (checkEmailList(userEmail, 'Lifetime Member')) {
      const roleName = 'Lifetime Member';
      const role = message.guild.roles.cache.find((r) => r.name === roleName);
      if (!role) {
        console.error(`Role ${roleName} not found!`);
        message.reply(`Sorry, the ${roleName} role was not found.`);
        return;
      }
      // Assign role and set assignedRole flag to true
      await message.member.roles.add(role);
      assignedRole = true;
    }

    if (checkEmailList(userEmail, 'Chivette')) {
      const roleName = 'Chivette';
      const role = message.guild.roles.cache.find((r) => r.name === roleName);
      if (!role) {
        console.error(`Role ${roleName} not found!`);
        message.reply(`Sorry, the ${roleName} role was not found.`);
        return;
      }
      // Assign role and set assignedRole flag to true
      await message.member.roles.add(role);
      assignedRole = true;
    }

    if (assignedRole) {
      // If a role has been assigned, reply with the appropriate message
      message.reply('You have been assigned the Lifetime Member role and the Chivette role!');
    } else {
      // If no role has been assigned, reply with the default message
      message.reply('Sorry, your email address is not found on our list.');
    }
  },
};

module.exports = {
  checkEmailList,
  RoleAssignmentPage
};
